/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { ThemeSwitch } from "@/components/theme-switch";
import { useUser } from "@/app/contexts/UserContext";

type SearchResults = {
  id: number;
  title: string;
  description: string;
};

export default function CustomNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults[] | []>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUser();
  const router = useRouter();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    { name: "Cart", href: cartPageHref },
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

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockResults = [
      { id: 1, title: "Elegant Abaya", description: "Black, embroidered" },
      { id: 2, title: "Silk Scarf", description: "Floral pattern, multicolor" },
      { id: 3, title: "Tunic Dress", description: "Navy blue, long sleeves" },
    ];

    setSearchResults(mockResults);
    setIsSearching(false);
  };

  return (
    <>
      <Navbar
        isBordered
        className="p-3 w-full backdrop-blur-md mx-auto duration-300 hover:shadow-lg z-50 justify-between max-w-full"
        maxWidth="full"
        position="sticky"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <Button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="p-0 bg-transparent ml-2 w-8 h-8 flex items-center justify-center"
            variant="light"
            onClick={toggleMenu}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </Button>
        </NavbarContent>

        <NavbarBrand className="flex gap-4 justify-center">
          <Link
            className="font-bold text-inherit flex text-2xl justify-center"
            href="../"
          >
            <Image alt="Logo" height={70} src="/logoonly.png" />
          </Link>
          <p className="text-xl text-foreground hidden sm:block">
            AALAA designs
          </p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex flex-1 gap-2" justify="center">
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
                <span className="text-base md:text-xl">{item.name}</span>
              </Button>
            </NavbarItem>
          ))}
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<ChevronDown />}
                  radius="sm"
                  variant="light"
                >
                  Categories
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Categories"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {categories.map((category) => (
                <DropdownItem key={category.name} className="py-2">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">
                      {category.name}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <Button
                          key={item}
                          as={Link}
                          className="text-sm"
                          color="primary"
                          href="#"
                          size="sm"
                          variant="flat"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarContent className="sm:flex-1" justify="end">
          <Button
            isIconOnly
            className="h-full w-10 flex items-center justify-center navbar-search-button"
            variant="light"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

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
                className="bg-background/95 backdrop-blur-md"
                variant="flat"
              >
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                {user.role === "admin" ? (
                  <DropdownItem
                    key="analytics"
                    onClick={() =>
                      (window.location.href =
                        "https://aalaadesigns-dashboard.vercel.app/")
                    }
                  >
                    Dashboard
                  </DropdownItem>
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
                className="bg-background/95 backdrop-blur-md"
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
        </NavbarContent>
      </Navbar>

      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsSearchExpanded(false)}
          >
            <motion.div
              animate={{ width: ["80%", "90%", "95%"], opacity: 1 }}
              className="bg-white border rounded shadow-xl overflow-hidden max-w-3xl w-full"
              exit={{ width: "80%", opacity: 0 }}
              initial={{ width: "80%", opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Input
                  ref={searchInputRef}
                  className="w-full py-6 px-4 text-lg rounded"
                  placeholder="Search..."
                  type="search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Button
                  isIconOnly
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 navbar-search-button"
                  variant="light"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close search</span>
                </Button>
              </div>
              {(searchResults.length > 0 || isSearching) && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4"
                  exit={{ opacity: 0, y: 10 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSearching ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Searching...
                      </p>
                    </div>
                  ) : (
                    <ul>
                      {searchResults.map((result) => (
                        <li
                          key={result.id}
                          className="py-2 hover:bg-accent/50 cursor-pointer transition-colors duration-150 ease-in-out"
                        >
                          <h3 className="text-sm font-medium">
                            {result.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {result.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed inset-y-0 left-0 z-50 w-full sm:w-80 bg-background/95 backdrop-blur-3xl text-foreground overflow-y-auto border-r border-border"
            exit={{ opacity: 0, x: "-100%" }}
            initial={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <Link href="../" onClick={toggleMenu}>
                <Image
                  alt="Logo"
                  className="w-32 text-center"
                  height={60}
                  src={theme === "light" ? "/logoblack.png" : "/logowhite.png"}
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
              <div className="p-4">
                {categories.map((category) => (
                  <div key={category.name} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                    {category.items.map((item) => (
                      <Button
                        key={item}
                        as={Link}
                        className="w-full justify-between mb-2 py-2 text-base font-semibold"
                        color="primary"
                        href="#"
                        variant="flat"
                        onClick={toggleMenu}
                      >
                        {item}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <h2 className="text-xl font-bold mb-2">Navigation</h2>
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    as={Link}
                    className="w-full justify-between mb-2 py-2 text-base font-semibold"
                    color="primary"
                    href={item.href}
                    variant="flat"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">{item.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t">
              {user ? (
                <Button
                  className="w-full justify-between py-2 text-base font-semibold"
                  color="primary"
                  variant="flat"
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                >
                  <span className="flex items-center">
                    <LogOut className="mr-2 w-4 h-4" />
                    Logout
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <>
                  <Button
                    as={Link}
                    className="w-full justify-between mb-2 py-2 text-base font-semibold"
                    color="primary"
                    href={signinPageHref}
                    variant="flat"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <LogIn className="mr-2 w-4 h-4" />
                      Login
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    as={Link}
                    className="w-full justify-between py-2 text-base font-semibold"
                    color="primary"
                    href={signupPageHref}
                    variant="flat"
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <UserRoundPlus className="mr-2 w-4 h-4" />
                      Sign up
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
