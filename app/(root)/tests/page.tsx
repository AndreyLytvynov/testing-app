import questions from "@/constants/questions.json";

const Tests = async () => {
  return (
    <section>
      <h1>Create test</h1>

      {questions.map((el) => {
        return <div key={el.id}>{el.id}</div>;
      })}
    </section>
  );
};

export default Tests;
