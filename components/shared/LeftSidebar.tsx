"use client";

import { sidebarLinks } from "@/constants";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.delete("/api/logout");
      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='custom-scrollbar bg-accent w-fit py-10 pl-10'>
      <h1 className='text-xl text-light-1 mb-4'>Test academy</h1>
      <button className='p-3 border border-red-300 mb-4' onClick={handleLogout}>
        LogOut
      </button>
      <nav>
        <ul className='flex flex-col gap-2'>
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <li
                key={link.label}
                className={`text-light-1 rounded-l-3xl hover:bg-light-1 hover:text-accent duration-200 ${
                  isActive && "text-accent bg-light-1"
                }`}
              >
                <Link href={link.route} className='flex items-center pl-5'>
                  {link.imgURL}
                  <p className=' py-3 px-6 pr-10 text-lg font-semibold'>
                    {link.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
};

export default LeftSidebar;
