import Link from "next/link";

import { getPopularTests } from "@/lib/actions/testing.actions";

import WhiteContainer from "./shared/WhiteContainer";

const PopularTestList = async () => {
  const popularTests = await getPopularTests();

  return (
    <section className='flex gap-6'>
      <WhiteContainer className='w-full'>
        <h2 className='mb-3 text-violet font-semibold text-sm'>
          Популярные тесты:
        </h2>
        <ul className='flex flex-col gap-3'>
          {popularTests.map((popularTests: any) => {
            return (
              <li
                key={popularTests._id}
                className={`text-violet flex justify-between items-center p-3 border border-light-1 rounded-xl hover:bg-light-1  duration-200`}
              >
                <Link
                  className='h-full w-full'
                  href={`/tests/${popularTests._id}`}
                >
                  <p>{popularTests.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </WhiteContainer>
    </section>
  );
};

export default PopularTestList;
