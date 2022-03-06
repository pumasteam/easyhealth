import prisma from '../../../utils/prisma';
import { useForm } from 'react-hook-form';
import { Widget } from '@uploadcare/react-widget';
import { useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

const UploadButton = ({ onUpload }) => {
  return (
    <Widget
      publicKey='624de14caf2cf3c7f75c'
      tabs='file url'
      previewStep='true'
      onChange={onUpload}
    />
  );
};

const EditPatient = ({ data }) => {
  const router = useRouter();

  const { id } = router.query;

  const [image, setImage] = useState(data.image);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: data
  });
  const onSubmit = (data) => {
    data.image = image;
    data.age = parseInt(data.age);
    data.sex = parseInt(data.sex);

    toast.promise(
      fetch(`/api/patient/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }),
      {
        loading: 'Updating...',
        success: 'Patient updated successfully',
        error: 'Error updating patient'
      }
    );
  };
  console.log(errors);

  return (
    <>
      <style jsx global>{`
        .uploadcare--widget__button {
          background-color: #157cfc !important;
        }
      `}
      </style>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center m-8'
      >
        <h1 className='text-5xl p-6 font-bold text-center'>
          Edit patient info
        </h1>
        <input
          className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light m-2'
          type='text'
          placeholder='Name'
          {...register('name', { required: true })}
        />
        <UploadButton onUpload={(e) => setImage(e.cdnUrl)} />
        <input
          className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light m-2'
          type='number'
          placeholder='Age'
          {...register('age', { required: true, max: 150, min: 1 })}
        />
        <select
          placeholder='Sex'
          className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light m-2'
          {...register('sex', { required: true })}
        >
          <option value='0'>male</option>
          <option value='1'>female</option>
        </select>
        <textarea
          className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light m-2'
          type='text'
          placeholder='Description'
          {...register('description', { required: true })}
        />

        <input
          type='submit'
          className='px-6 py-3 m-6 text-white duration-150 bg-indigo-600 rounded-md hover:bg-indigo-700 active:shadow-lg'
        />
      </form>
      <Toaster />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const patient = await prisma.patient.findUnique({
    where: {
      id
    }
  });

  return {
    props: {
      data: patient
    }
  };
};

EditPatient.auth = true;

export default EditPatient;
