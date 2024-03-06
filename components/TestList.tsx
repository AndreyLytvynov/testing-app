import Link from "next/link";

import { TestResponse } from "@/types/test";
import { FC } from "react";

type PopularTestListProps = {
  tests: TestResponse[];
};

const TestList: FC<PopularTestListProps> = async ({ tests }) => {
  return (
    <ul className='flex flex-col gap-3 w-full'>
      {tests.map((popularTests: any) => {
        return (
          <li
            key={popularTests._id}
            className={`text-violet  flex justify-between items-center p-3 border border-light-1 rounded-xl hover:bg-light-1  duration-200`}
          >
            <Link className='h-full w-full' href={`/tests/${popularTests._id}`}>
              <p>{popularTests.name}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TestList;
