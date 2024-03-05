import Link from "next/link";

import { getAllTests } from "@/lib/actions/testing.actions";

import Heading from "@/components/shared/Heading";
import WhiteContainer from "@/components/shared/WhiteContainer";

const Tests = async () => {
  const tests = await getAllTests();

  return (
    <section>
      <Heading>Test list</Heading>
      <WhiteContainer>
        <ul className=' rounded-xl flex flex-col gap-2'>
          {tests.map((test) => {
            return (
              <li
                className='border border-light-1 rounded-xl hover:bg-light-1  duration-200'
                key={test._id}
              >
                <Link
                  className='block h-full w-full px-3 py-2'
                  href={`/tests/${test._id}`}
                >
                  {test.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </WhiteContainer>
    </section>
  );
};

export default Tests;
