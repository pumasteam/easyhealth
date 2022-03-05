import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Checker = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => router.push(`/checker/${data.age}/${data.text}`);
  console.log(errors);

  return (
    <form
      className="p-8 flex items-center justify-center flex-col mt-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-5xl mb-6 font-bold text-center">
        Insert patient info
      </h1>
      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 w-96">
        The patient age
        <input
          placeholder="e.g: 12"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          {...register("age", { required: true, max: 150, min: 1 })}
        />
      </label>

      <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 w-96 h-40">
        Patient&apos;s prompt
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("text", { required: true })}
        />
      </label>

      <input
        className="px-6 py-3 m-6 text-white duration-150 bg-indigo-600 rounded-md hover:bg-indigo-700 active:shadow-lg"
        type="submit"
      />
    </form>
  );
};

Checker.auth = true;

export default Checker;
