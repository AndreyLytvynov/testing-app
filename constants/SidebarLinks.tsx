import { BsClipboardDataFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";

import { FaHome } from "react-icons/fa";

export const sidebarLinks = [
  {
    icon: <FaHome size={25} />,
    route: "/",
    label: "Home",
  },
  {
    icon: <BsClipboardDataFill size={25} />,
    route: "/tests",
    label: "All tests",
  },
  {
    icon: <IoIosCreate size={25} />,
    route: "/create-test",
    label: "Create test",
  },
];
