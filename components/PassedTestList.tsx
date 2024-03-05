import { FC } from "react";
import Link from "next/link";
import { FaRepeat } from "react-icons/fa6";

import WhiteContainer from "./shared/WhiteContainer";

import { PassedTestResponse } from "@/types/test";

type PassedTestListProps = {
  passedTests: PassedTestResponse[];
};

const PassedTestList: FC<PassedTestListProps> = ({ passedTests }) => {
  return (
    <section className='mb-6'>
      <WhiteContainer className='w-full'>
        <h2 className='mb-3 text-violet font-semibold text-sm'>
          Пройденные тесты:
        </h2>
        <ul className='flex flex-col gap-3'>
          {passedTests.map((passedTest: PassedTestResponse) => {
            return (
              <li
                key={passedTest.test._id}
                className={`text-violet flex justify-between items-center border border-light-1 rounded-xl p-2`}
              >
                <p>{passedTest.test.name}</p>

                <div className='flex flex-row items-center gap-2'>
                  <p
                    className={`${
                      passedTest.passed ? "text-green-500" : "text-red-500"
                    } p-1 px-2`}
                  >
                    {passedTest.passed ? "test passed" : "test failed"}
                  </p>

                  <Link
                    className='border text-violet hover:text-white hover:bg-violet duration-200 border-violet p-1 rounded-xl flex justify-between items-center gap-2 h-full'
                    href={`/tests/${passedTest.test._id}`}
                  >
                    <FaRepeat />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </WhiteContainer>
    </section>
  );
};

export default PassedTestList;
