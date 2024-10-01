"use client";

import { useState, useEffect, useRef } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import {
  ShoppingBag,
  Search,
  X,
  CircleUserRound,
  LogIn,
  UserRoundPlus,
  LogOut,
} from "lucide-react";

export default function CustomNavBar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);

  type User = {
    email: string;
    password: string;
    id: number;
    createdat: string;
    username: string;
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const newUser = localStorage.getItem("user");

      if (newUser) {
        var userString: string = newUser;
        const parsedUser = JSON.parse(userString);

        if (parsedUser !== user) {
          setUser(parsedUser);
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const aboutPageHref = "/about";
  const cartPageHref = "/cart";
  const signinPageHref = "/Auth/sign-in";
  const signupPageHref = "/Auth/sign-up";

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Cart",
      href: cartPageHref,
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    { name: "About", href: aboutPageHref },
  ];
  const categories = [
    { name: "Basics", href: "#" },
    { name: "Dresses", href: "#" },
    { name: "Tops", href: "#" },
    { name: "Skirts", href: "#" },
    { name: "Abayas", href: "#" },
    { name: "Tunic", href: "#" },
    { name: "Scarves", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Denim", href: "#" },
    { name: "Jackets/Coats/Blazers", href: "#" },
    { name: "Hoodies/Sweaters", href: "#" },
  ];

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  return (
    <>
      <Navbar
        isBordered
        className="p-3 w-full rounded-lg backdrop-blur-md mx-auto bg-white  duration-300 hover:shadow-lg z-50"
        height="6rem"
        position="sticky"
      >
        <NavbarContent className="md:flex-1">
          <Button
            aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
            className="p-0 bg-transparent ml-2 w-2 h-8 flex items-center justify-center"
            variant="light"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          >
            <div className={`menu-icon ${isSideMenuOpen ? "open" : ""}`}>
              <span />
              <span />
              <span />
            </div>
          </Button>
        </NavbarContent>

        <NavbarBrand className="flex-1 justify-center">
          <Link
            className="font-bold text-inherit flex w-full text-2xl justify-center"
            href="../"
          >
            <Image alt="Logo" height={70} src="/logoonly.png" />
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex flex-1 gap-6" justify="end">
          <div className="relative flex items-center justify-end">
            <Link
              aria-label="Search"
              className={`p-2 bg-transparent ${isSearchExpanded ? "hidden" : ""}`}
              onClick={toggleSearch}
            >
              <Search className="w-5 h-5" />
            </Link>
            <div
              className={`absolute right-0 ${
                isSearchExpanded
                  ? "w-64 opacity-100 bg-transparent border-b-1 border-solid border-gray-500"
                  : "w-0 opacity-0"
              } transition-all duration-300 ease-in-out overflow-hidden`}
            >
              <input
                ref={searchInputRef}
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="search"
                placeholder="Search..."
                type="text"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Link
                aria-label="Close search"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-transparent"
                onClick={toggleSearch}
              >
                <X className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {menuItems.map((item) => (
            <NavbarItem key={item.name} className="hover:bg-none">
              <Button
                disableRipple
                as={Link}
                className="hover:text-gray-600"
                color="primary"
                href={item.href}
                variant="light"
              >
                {item.icon}
                <span className="text-xl">{item.name}</span>
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="md:flex-1" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {user ? (
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              ) : (
                <CircleUserRound className="w-6 h-6" />
              )}
            </DropdownTrigger>
            {user ? (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout">Sign in</DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavbarContent>
      </Navbar>

      {/* Full-screen Side Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <Image
            alt="Logo"
            className="mx-auto"
            height={110}
            src="/logoblack.png"
          />
          <Button
            aria-label="Close menu"
            className="p-0 bg-transparent"
            variant="light"
            onClick={() => setIsSideMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            {categories.map((item) => (
              <Link
                key={item.name}
                className="block py-2 px-4 text-xl font-semibold text-gray-800 hover:bg-gray-200 rounded"
                href={item.href}
                onClick={() => setIsSideMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <h2 className="text-2xl font-bold mt-8 mb-4">Menu</h2>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                className="flex py-2 px-4 text-xl font-semibold text-gray-800 hover:bg-gray-200 rounded"
                href={item.href}
                onClick={() => setIsSideMenuOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          {user ? (
            <div className="flex items-center">
              <LogOut className="mr-2" />
              <Button
                as={Link}
                className="justify-start w-full"
                color="primary"
                href={signinPageHref}
                variant="flat"
                onClick={() => {
                  setIsSideMenuOpen(false);
                  localStorage.removeItem("user");
                  setUser(null);
                }}
              >
                <span className="text-xl">Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-2">
                <LogIn className="mr-2" />
                <Button
                  as={Link}
                  className="justify-start w-full"
                  color="primary"
                  href={signinPageHref}
                  variant="flat"
                  onClick={() => setIsSideMenuOpen(false)}
                >
                  <span className="text-xl">Login</span>
                </Button>
              </div>
              <div className="flex items-center">
                <UserRoundPlus className="mr-2" />
                <Button
                  as={Link}
                  className="justify-start w-full"
                  color="primary"
                  href={signupPageHref}
                  variant="flat"
                  onClick={() => setIsSideMenuOpen(false)}
                >
                  <span className="text-xl">Sign up</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
