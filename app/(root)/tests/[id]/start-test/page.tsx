import Testing from "@/components/Testing";
import { getTest } from "@/lib/actions/testing.actions";
import { TestResponse } from "@/types/test";

const TestingPage = async ({ params }: { params: { id: string } }) => {
  const responseJson = await getTest(params.id);

  // use JSON.parse to fix the error "next 13 RangeError: Maximum call stack size exceeded at String.replace (<anonymous>)"
  const test = JSON.parse(responseJson) as TestResponse;

  return <section>{responseJson && <Testing test={test} />}</section>;
};

export default TestingPage;
