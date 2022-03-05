import Loading from "../components/Loading";
import Stats from "../components/Stats";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const { data } = useSWR("/api/patient", fetcher);

  const router = useRouter();

  const createPatient = async () => {
    const res = await fetch("/api/patient/new");
    const data = await res.json();

    router.push(`/patient/edit/${data.id}`);
  };

  const deletePatient = async (id) => {
    toast.promise(fetch(`/api/patient/delete/${id}`), {
      loading: "Loading...",
      success: "Patient deleted",
      error: "Error deleting patient",
    });
  };

  if (!data) return <Loading />;

  return (
    <section className="flex flex-col items-center justify-center p-8">
      <Stats />
      <section className="w-4/6 flex flex-col items-center justify-center">
        <article className="m-4 w-full flex items-center justify-around">
          <h1 className="text-2xl font-bold">Patients</h1>
          <button
            className="px-4 py-2 m-6 text-white duration-150 bg-indigo-600 rounded-md hover:bg-indigo-700 active:shadow-lg"
            onClick={createPatient}
          >
            New patient
          </button>
        </article>
        <article>
          <ul>
            {data.map((i, k) => (
              <li className="text-xl p-2" key={k}>
                <Link href={`/patient/${i.id}`}>
                  <a>{`${i.name} - ${i.age} - ${
                    i.sex == 1 ? "female" : "male"
                  }`}</a>
                </Link>{" "}
                -{" "}
                <Link href={`/patient/edit/${i.id}`}>
                  <a className="cursor-pointer underline text-blue-600 hover:no-underline">
                    Edit
                  </a>
                </Link>{" "}
                -{" "}
                <span
                  className="cursor-pointer underline text-red-600 hover:no-underline"
                  onClick={() => deletePatient(i.id)}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <Toaster />
    </section>
  );
};

Home.auth = true;

export default Home;
