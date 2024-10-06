"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Search,
  X,
  CircleUserRound,
  LogIn,
  UserRoundPlus,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import { useUser } from "@/app/contexts/UserContext";

export default function CustomNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useUser();
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
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

  useEffect(() => {
    const body = document.body;

    if (isMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const { theme } = useTheme();
  const aboutPageHref = "/about";
  const cartPageHref = "/cart";
  const signinPageHref = "/Auth/sign-in";
  const signupPageHref = "/Auth/sign-up";

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Cart",
      href: cartPageHref,
    },
    { name: "About", href: aboutPageHref },
  ];
  const categories = [
    {
      name: "Clothing",
      items: ["Basics", "Dresses", "Tops", "Skirts", "Abayas", "Tunic"],
    },
    { name: "Accessories", items: ["Scarves", "Jewelry", "Bags"] },
    { name: "Outerwear", items: ["Jackets", "Coats", "Blazers"] },
    { name: "Knitwear", items: ["Sweaters", "Cardigans", "Hoodies"] },
  ];

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <Navbar
        isBordered
        className="p-3 w-full backdrop-blur-md mx-auto duration-300 hover:shadow-lg z-50 justify-between max-w-full"
        height="6rem"
        maxWidth="full"
        position="sticky"
      >
        <div className="w-full flex justify-between items-center">
          <div className="w-1/3">
            <NavbarContent className="md:flex-1">
              <Button
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="p-0 bg-transparent ml-2 w-8 h-8 flex items-center justify-center"
                variant="light"
                onClick={toggleMenu}
              >
                <Menu className="w-6 h-6 text-foreground" />
              </Button>
            </NavbarContent>
          </div>
          <div className="w-1/3 flex justify-center">
            <NavbarBrand className="flex gap-4 justify-center">
              <Link
                className="font-bold text-inherit flex text-2xl justify-center"
                href="../"
              >
                <Image alt="Logo" height={70} src="/logoonly.png" />
              </Link>
              {!isSmallScreen && (
                <p className="text-xl text-foreground">AALAA designs</p>
              )}
            </NavbarBrand>
          </div>
          <div className="w-1/3 flex justify-evenly">
            <NavbarContent
              className="hidden md:flex flex-1 gap-2"
              justify="end"
            >
              {menuItems.map((item) => (
                <NavbarItem key={item.name} className="hover:bg-none">
                  <Button
                    disableRipple
                    as={Link}
                    className="text-foreground"
                    color="primary"
                    href={item.href}
                    variant="light"
                  >
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
                      name={user.username}
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  ) : (
                    <CircleUserRound className="w-6 h-6 text-foreground" />
                  )}
                </DropdownTrigger>
                {user ? (
                  <DropdownMenu
                    aria-label="Profile Actions"
                    className="bg-background/95 backdrop-blur-md "
                    variant="flat"
                  >
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">Settings</DropdownItem>

                    {user.role === "admin" ? (
                      <DropdownItem key="analytics">Dashborad</DropdownItem>
                    ) : (
                      <DropdownItem key="analytics">My orders</DropdownItem>
                    )}

                    <DropdownItem
                      key="logout"
                      color="danger"
                      onClick={handleLogout}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu
                    aria-label="Profile Actions"
                    className="bg-background/95 backdrop-blur-md "
                    variant="flat"
                  >
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="signin" as={Link} href={signinPageHref}>
                      Sign in
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
              <ThemeSwitch />
              <div className="relative flex items-center justify-end">
                <button
                  aria-label="Search"
                  className={`p-2 bg-transparent ${isSearchExpanded ? "hidden" : ""}`}
                  onClick={toggleSearch}
                >
                  <Search className="w-5 h-5 text-foreground" />
                </button>
                <div
                  className={`absolute right-0 ${
                    isSearchExpanded
                      ? "w-64 opacity-100 bg-transparent border-b border-solid border-gray-500"
                      : "w-0 opacity-0"
                  } transition-all duration-300 ease-in-out overflow-hidden`}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground" />
                    <input
                      ref={searchInputRef}
                      className="w-full pl-10 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                      id="search"
                      placeholder="Search..."
                      type="text"
                    />
                    <button
                      aria-label="Close search"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-transparent"
                      onClick={toggleSearch}
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </NavbarContent>
          </div>
        </div>
      </Navbar>

      {/* Top-opening Menu */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } flex flex-col bg-background/95 backdrop-blur-3xl text-foreground overflow-y-auto border-b border-border`}
        style={{
          height: "100vh",
          maxHeight: "100vh",
        }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <div />
          <Link href="../">
            <Image
              alt="Logo"
              className="mx-auto w-4/5 text-center"
              height={120}
              src={theme === "light" ? "/logoblack.png" : "/logowhite.png"}
              onClick={toggleMenu}
            />
          </Link>
          <Button
            aria-label="Close menu"
            className="p-0 bg-transparent"
            variant="light"
            onClick={toggleMenu}
          >
            <X className="w-6 h-6 text-foreground" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`mb-6 ${index % 2 === 1 ? "md:border-l md:pl-4" : ""}`}
              >
                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                {category.items.map((item) => (
                  <div key={item} className="justify-center flex flex-wrap">
                    <Button
                      as={Link}
                      className="w-full justify-between mb-2 py-3 text-lg font-semibold hover:bg-gray-200  hover:text-black rounded transition-all duration-1000"
                      color="primary"
                      href="#"
                      variant="flat"
                      onClick={toggleMenu}
                    >
                      {item}
                      <ChevronRight className="w-5 h-5" />
                    </Button>

                    <div className="w-[94%] px-[12px] border-gray-300 border-b-1 " />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {isSmallScreen && (
            <div className="p-4 border-t">
              <h2 className="text-2xl font-bold mb-4">Navigation</h2>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  as={Link}
                  className="w-full justify-between mb-2 py-3 text-lg font-semibold"
                  color="primary"
                  href={item.href}
                  variant="flat"
                  onClick={toggleMenu}
                >
                  <span className="flex items-center">{item.name}</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          {user ? (
            <Button
              className="w-full justify-between py-3 text-lg font-semibold"
              color="primary"
              variant="flat"
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
            >
              <span className="flex items-center">
                <LogOut className="mr-2" />
                Logout
              </span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <>
              <Button
                as={Link}
                className="w-full justify-between mb-2 py-3 text-lg font-semibold"
                color="primary"
                href={signinPageHref}
                variant="flat"
                onClick={toggleMenu}
              >
                <span className="flex items-center">
                  <LogIn className="mr-2" />
                  Login
                </span>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button
                as={Link}
                className="w-full justify-between py-3 text-lg font-semibold"
                color="primary"
                href={signupPageHref}
                variant="flat"
                onClick={toggleMenu}
              >
                <span className="flex items-center">
                  <UserRoundPlus className="mr-2" />
                  Sign up
                </span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
