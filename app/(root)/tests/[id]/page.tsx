import Link from "next/link";

import { getTest } from "@/lib/actions/testing.actions";

import { TestResponse } from "@/types/test";
import Heading from "@/components/shared/Heading";

const StartTest = async ({ params }: { params: { id: string } }) => {
  const responseJson = await getTest(params.id);

  // use JSON.parse to fix the error "next 13 RangeError: Maximum call stack size exceeded at String.replace (<anonymous>)"
  const test = JSON.parse(responseJson) as TestResponse;

  return (
    <div className=''>
      <Heading>{test.name}</Heading>
      <div className='bg-white rounded-lg p-2 mb-3 text-text-color'>
        <p>The test contains {test.questions.length} questions;</p>
        <p>
          For each question there are four possible answers, one of which is
          correct.
        </p>
        <p>
          To successfully pass the test you must not make more than 1 mistakes.
        </p>
      </div>

      <Link
        className='flex items-center justify-center text-sm font-semibold test max-w-32 bg-violet border border-violet  text-light-1 py-2 px-4 rounded-xl hover:bg-light-1 hover:text-violet'
        href={`/tests/${params.id}/start-test`}
      >
        Start test
      </Link>
    </div>
  );
};

export default StartTest;
