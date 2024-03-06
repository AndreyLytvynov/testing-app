import Link from "next/link";

import { searchTests } from "@/lib/actions/testing.actions";

import Heading from "@/components/shared/Heading";
import WhiteContainer from "@/components/shared/WhiteContainer";

import SearchBar from "@/components/SearchBar";
import TestList from "@/components/TestList";

const Tests = async ({ searchParams }: { searchParams: any }) => {
  const query = searchParams.query;

  const tests = await searchTests(query);

  return (
    <>
      <Heading>Test list</Heading>

      <SearchBar />

      {tests.length !== 0 ? (
        <WhiteContainer className='mt-5'>
          <TestList tests={tests} />
        </WhiteContainer>
      ) : (
        <p className='text-center mt-5 text-violet font-semibold'>Not result</p>
      )}
    </>
  );
};

export default Tests;
