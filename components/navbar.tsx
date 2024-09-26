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
} from "@nextui-org/react";
import { ShoppingBag, Search, X } from "lucide-react";

import "@/styles/globals.css";

export default function CustomNavBar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        className="p-3 w-full rounded-lg backdrop-blur-md mx-auto bg-white bg-opacity-60 hover:bg-opacity-30 duration-300 hover:shadow-lg z-50"
        height="6rem"
      >
        <NavbarContent className="flex" justify="start">
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
        <NavbarBrand className="flex-1 justify-center mr-36 md:mr-36 sm:mr-36 sm:w-4/5 md:w-4/5">
          <Link
            className="font-bold text-inherit  flex w-full  text-2xl justify-center"
            href="."
          >
            <Image alt="Logo" height={70} src="/logoonly.png" />
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex flex-1 gap-6" justify="end">
          <div className="relative flex items-center justify-end">
            <Link
              aria-label="Search"
              className={`p-2 bg-transparent  ${isSearchExpanded ? "hidden" : ""}`}
              variant="light"
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
                className="w-full pl-10 pr-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="search"
                placeholder="Search..."
                type="text"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Link
                aria-label="Close search"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-transparent"
                variant="light"
                onClick={toggleSearch}
              >
                <X className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {menuItems.map((item) => (
            <NavbarItem
              key={item.name}
              className="hover:bg-none hover:scale-110 duration-300"
            >
              <Button
                as={Link}
                className="hover:bg-blue-700 hover:text-blue-600"
                color="primary"
                href={item.href}
                variant="light"
              >
                {item.icon}
                <span className="text-lg">{item.name}</span>
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>

      {/* Overlay */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          role="button"
          tabIndex={0}
          onClick={() => setIsSideMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsSideMenuOpen(false);
            }
          }}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="p-4 border-b flex flex-col items-center">
          <div className="w-full flex justify-end mb-4">
            <Button
              aria-label="Close menu"
              className="p-0 bg-transparent"
              variant="light"
              onClick={() => setIsSideMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <Image
            alt="Logo"
            className="mx-auto"
            height={110}
            src="/logoblack.png"
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
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

            {isSmallScreen && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-2">Menu</h3>
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    className="flex py-2 px-4 text-gray-800 hover:bg-gray-200 rounded"
                    href={item.href}
                    onClick={() => setIsSideMenuOpen(false)}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>

        <div>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            className="justify-start"
          >
            Login
          </Button>
        </div>
        <div>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            className="justify-start"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}
