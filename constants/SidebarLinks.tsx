import HomeIcon from "@/components/icons/HomeIcon";
import SearchIcon from "@/components/icons/SearchIcon";

export const sidebarLinks = [
  {
    imgURL: <HomeIcon />,
    route: "/",
    label: "Home",
  },
  {
    imgURL: <SearchIcon />,
    route: "/tests",
    label: "Test list",
  },
  {
    imgURL: <SearchIcon />,
    route: "/create-test/create",
    label: "Create test",
  },
];
