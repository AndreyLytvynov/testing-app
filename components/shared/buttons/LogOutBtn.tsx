"use client";

import { LogOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await LogOut();
    router.push("/login");
  };

  return (
    <button
      className='p-3 border border-red-300 mb-4 max-w-[100px]'
      onClick={handleLogout}
    >
      LogOut
    </button>
  );
};

export default LogOutBtn;
