import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CreatePassedTest } from "@/lib/actions/testing.actions";

import Button from "../shared/buttons/Button";
import { Question, TestResponse } from "@/types/test";

import { IoDocumentOutline } from "react-icons/io5";

type TestResultProps = {
  test: TestResponse;
  uncorrectedAnswer: Question[];
  correctAnswer: number;
};

const TestResult: FC<TestResultProps> = ({
  test,
  uncorrectedAnswer,
  correctAnswer,
}) => {
  const router = useRouter();
  const passed = uncorrectedAnswer.length <= 1;

  const handleCompleteTest = async () => {
    await CreatePassedTest(test._id, uncorrectedAnswer, passed);
    router.push("/");
  };

  return (
    <>
      <div
        className={`py-8 ${
          passed ? "bg-passed" : "bg-failed"
        } bg-no-repeat bg-right bg-contain`}
      >
        <p>{passed ? " Test passed" : "Test failed"}</p>
        <p>Questions: {test.questions.length}</p>
        <p>Correct answers: {correctAnswer}</p>
        <p className='mb-5'>Correct answers: {uncorrectedAnswer.length}</p>
      </div>

      {uncorrectedAnswer.length !== 0 && (
        <div className='mb-5 '>
          <p>Questions you answered incorrectly:</p>
          <ul className='bg-white rounded-lg p-3 flex flex-col gap-2'>
            {uncorrectedAnswer.map((answer) => {
              return (
                <li
                  className=' flex flex-row justify-between items-center border border-light-1 rounded-lg p-2'
                  key={answer._id}
                >
                  <p>{answer.question}</p>
                  {answer.docs && (
                    <Link
                      className='border text-violet border-violet hover:bg-violet hover:text-white duration-200 rounded-xl p-2 flex flex-row gap-2 justify-between items-center'
                      href={answer.docs}
                      target='_blank'
                    >
                      read docs
                      <IoDocumentOutline />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className='flex gap-4'>
        <Link
          href={`/tests/${test._id}`}
          className='flex justify-center max-w-[150px] border text-light-1 bg-violet border-violet hover:text-violet duration-200 hover:bg-light-1 p-2 rounded'
        >
          Take test again
        </Link>
        <Button onClick={handleCompleteTest}>Test complete</Button>
      </div>
    </>
  );
};

export default TestResult;
