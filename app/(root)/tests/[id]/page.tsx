import questions from "@/constants/questions.json";
import Link from "next/link";

const page = ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  console.log("aaaa", questions[Number(params.id)].options);
  console.log("sss");

  return (
    <div>
      {questions[Number(params.id)].options.map((el) => {
        return <div key={el}>{el}</div>;
      })}
      <Link href={`/tests/${Number(params.id) + 1}`}>NEXT</Link>
      <Link href={`/tests/${Number(params.id) - 1}`}>PREV</Link>
    </div>
  );
};

export default page;
