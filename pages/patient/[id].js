import { useRouter } from 'next/router';
import Link from 'next/link';
import prisma from '../../utils/prisma';
import Image from 'next/image';
import useSWR from 'swr';
import Loading from '../../components/Loading';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const Patient = ({ patient, consultations }) => {
  const router = useRouter();

  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    data.date = new Date();
    toast.promise(
      fetch(`/api/consult/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }),
      {
        loading: 'Loading...',
        success: 'Consultation created',
        error: 'Error creating consultation'
      }
    );
  };
  console.log(errors);

  console.log(patient);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(
    `/api/nlp/${patient.age}/${patient.description}`,
    fetcher
  );

  if (!data) return <Loading />;

  return (
    <section className='m-8 flex flex-col items-center justify-center'>
      <Image
        src={patient.image}
        height={150}
        width={150}
        className='rounded-full'
        alt='user'
      />
      <h1 className='text-3xl font-bold m-2'>{patient.name}</h1>
      <h2 className='text-xl'>{`${patient.sex == 0 ? 'male' : 'female'} - ${
        patient.age
      } years`}
      </h2>
      <p>{patient.description}</p>
      <h3 className='text-xl p-2 font-bold'>Symptoms</h3>
      <ul>
        {data.mentions.map(({ id, name, choice_id }) => (
          <li className='text-center' key={id}>
            {name}
            {choice_id && <span> ({choice_id})</span>}
          </li>
        ))}
      </ul>
      <h3 className='text-xl p-2 font-bold'>Pasts consultations</h3>
      {consultations.map((i, k) => (
        <section key={k}>
          <h3 className='text-xl text-center p-2 font-bold'>{`Date: ${i.createdAt}`}</h3>
          <p className='text-center'>{i.notes}</p>
        </section>
      ))}
      <h3 className='text-xl p-2 font-bold'>Add consultation</h3>
      <form
        className='flex flex-col items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          placeholder="today's consultation"
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...register('notes', { required: true })}
        />

        <input
          className='p-2 m-4 text-white duration-150 bg-indigo-600 rounded-md hover:bg-indigo-700 active:shadow-lg'
          type='submit'
        />
      </form>
      <Link href={`/patient/edit/${id}`}>
        <a className='px-4 py-2 m-6 text-white duration-150 bg-indigo-600 rounded-md hover:bg-indigo-700 active:shadow-lg'>
          Edit
        </a>
      </Link>
      <Toaster />
    </section>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const patient = await prisma.patient.findUnique({
    where: {
      id
    }
  });

  const consultations = await prisma.consultation.findMany({
    where: {
      patientId: id
    }
  });

  consultations.map((i) => {
    i.createdAt = new Date(i.createdAt).toDateString();
  });

  return {
    props: {
      patient,
      consultations
    }
  };
};

Patient.auth = true;

export default Patient;
