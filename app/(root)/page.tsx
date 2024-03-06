import { getUser } from "@/lib/actions/user.actions";

import { getPopularTests } from "@/lib/actions/testing.actions";

import PassedTestList from "@/components/PassedTestList";
import UserStatistics from "@/components/UserStatistics";
import WhiteContainer from "@/components/shared/WhiteContainer";
import TestList from "@/components/TestList";

export default async function Home() {
  const user = await getUser();
  const passedTests = user.passedTest;
  const popularTests = await getPopularTests();

  return (
    <>
      <UserStatistics user={user} />

      <WhiteContainer className='mb-6'>
        <h2 className='mb-3 text-violet font-semibold text-sm'>
          Пройденные тесты:
        </h2>
        {passedTests.length !== 0 && (
          <PassedTestList passedTests={passedTests} />
        )}
      </WhiteContainer>

      <WhiteContainer>
        <h2 className='mb-3 text-violet font-semibold text-sm'>
          Популярные тесты:
        </h2>
        <TestList tests={popularTests} />
      </WhiteContainer>
    </>
  );
}
