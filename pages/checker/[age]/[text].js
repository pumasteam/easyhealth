import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Results = () => {
  const router = useRouter();
  const { age, text } = router.query;

  const { data } = useSWR(`/api/nlp/${age}/${text}`, fetcher);

  if (!data) return <Loading />;

  return (
    <section className="flex items-center justify-center flex-col p-8">
      <h1 className="text-5xl p-6 font-bold text-center">Symptoms</h1>
      <ul>
        {data.mentions.map(({ id, name, choice_id }) => (
          <li className="text-2xl" key={id}>
            {name}
            {choice_id && <span>({choice_id})</span>}
          </li>
        ))}
      </ul>
      <Link href="/checker">
        <a className="px-6 py-3 m-6 text-white duration-150 bg-indigo-600 rounded-md hover:bg-indigo-700 active:shadow-lg">
          Return
        </a>
      </Link>
    </section>
  );
};

Results.auth = true;

export default Results;
