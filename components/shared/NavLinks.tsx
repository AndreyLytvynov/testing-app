"use client";

import { sidebarLinks } from "@/constants/SidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type NavLinksProps = {
  role: string | undefined;
};

const NavLinks: FC<NavLinksProps> = ({ role = "user" }) => {
  const pathname = usePathname();

  return (
    <nav className='flex-1'>
      <ul className='flex flex-col gap-2'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (role !== "admin" && link.route === "/create-test") {
            return null;
          }
          return (
            <li
              key={link.label}
              className={`text-light-1 rounded-l-3xl hover:bg-light-1 hover:text-violet duration-200 ${
                isActive && "text-violet bg-light-1"
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
  );
};

export default NavLinks;
