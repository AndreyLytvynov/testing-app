import NavLinks from "./NavLinks";
import Image from "next/image";

import { getUserFromToken } from "@/lib/actions/user.actions";

import LogOutBtn from "./buttons/LogOutBtn";

const LeftSidebar = async () => {
  const user = await getUserFromToken();

  if (user)
    return (
      <section className='bg-violet w-fit py-10 pl-7 flex flex-col max-w-[270px] justify-start'>
        <div className='flex mb-8 flex-col'>
          <div className='flex flex-col items-left pr-3'>
            <p className='text-sm text-light-1 line-clamp-1 '>
              {user.username}
            </p>
            <p className='text-green-500'>{user.role}</p>
          </div>
        </div>
        <NavLinks role={user.role} />
        <LogOutBtn />
      </section>
    );
};

export default LeftSidebar;
