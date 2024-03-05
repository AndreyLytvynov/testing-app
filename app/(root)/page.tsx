import { getUser } from "@/lib/actions/user.actions";

import PassedTestList from "@/components/PassedTestList";
import PopularTestList from "@/components/PopularTestList";
import UserStatistics from "@/components/UserStatistics";

export default async function Home() {
  const user = await getUser();
  const passedTests = user.passedTest;

  return (
    <>
      <UserStatistics user={user} />
      {passedTests.length !== 0 && <PassedTestList passedTests={passedTests} />}
      <PopularTestList />
    </>
  );
}
