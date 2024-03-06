import { FC } from "react";
import Image from "next/image";

import { ResponseUser } from "@/types/user";

type UserStatisticsProps = {
  user: ResponseUser;
};

const UserStatistics: FC<UserStatisticsProps> = async ({ user }) => {
  const passedTests = user.passedTest;

  const successfullyPassedTests = passedTests.reduce((acc, test) => {
    if (test.passed) {
      return (acc += 1);
    }
    return acc;
  }, 0);

  return (
    <section className='class="w-ful h-[260px] bg-violet flex flex-col rounded-t-xl rounded-b-2xl mb-6'>
      <div className='h-[100px]' />
      <div className='relative h-[160px] bg-white w-full self-end rounded-b-xl pl-5'>
        <div className='p-3 bg-white absolute -translate-y-1/2 left-4 rounded-full overflow-hidden'>
          <Image
            src={"/assets/logo.jpg"}
            alt='user photo'
            width={500}
            height={500}
            className='rounded-full w-[150px] h-[150px] object-cover'
          />
        </div>
        <div className='flex gap-32'>
          <div className='mt-20 items-center'>
            <p className='text-lg font-semibold text-green-400 '>{user.role}</p>
            <p className='text-lg font-bold text-violet'>{user.email}</p>
          </div>
          <div className='mt-10 text-violet font-semibold'>
            <p>Всего пройдено тестов: {passedTests.length}</p>
            <p>Успешно пройдено тестов: {successfullyPassedTests}</p>

            <p>Мой рейтинг: 3</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserStatistics;
