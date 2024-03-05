"use client";

import { LogOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

const LogOutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await LogOut();
    router.push("/login");
  };

  return (
    <button
      className='rounded-l-3xl p-3 flex items-center justify-start gap-3 text-light-1 hover:bg-light-1 hover:text-violet'
      onClick={handleLogout}
    >
      <IoIosLogOut className='' size={30} />
      <p className='x font-bold text-sm'>LogOut</p>
    </button>
  );
};

export default LogOutBtn;
