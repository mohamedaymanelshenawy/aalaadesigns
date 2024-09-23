"use client";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";

export default function CustomNavBar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const aboutPageHref = "/about";
  const cartPageHref = "/cart";

  const menuItems = [
    { name: "Home", href: "." },
    {
      name: "Cart",
      href: cartPageHref,
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    { name: "About", href: aboutPageHref },
  ];
  const categories = [
    { name: "Skirt", href: "#" },
    { name: "Jupes", href: "#" },
    { name: "Dress", href: "#" },
    { name: "Cardigans", href: "#" },
    { name: "Tops", href: "#" },
    { name: "Pants", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Shoes", href: "#" },
  ];

  return (
    <>
      <Navbar
        shouldHideOnScroll
        className="p-3 w-full rounded-lg backdrop-blur-md mx-auto bg-white bg-opacity-10 hover:bg-opacity-30 duration-300 hover:shadow-lg z-50"
      >
        <NavbarBrand>
          <Link
            className="font-bold text-inherit text-2xl md:text-4xl hover:text-grey-900"
            href="."
          >
            Aalaa Designs
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-6" justify="center">
          <div className="relative">
            <input
              className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
              type="text"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem>
            <Link className="text-blue-600 hover:underline" href="#">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Button
            className="p-0 bg-transparent"
            variant="light"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </NavbarContent>
      </Navbar>

      {/* Overlay */}
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          role="button"
          tabIndex="0"
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
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="p-4 border-b">
          <Button
            className="p-0 bg-transparent absolute top-4 right-4"
            variant="light"
            onClick={() => setIsSideMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-bold">
            {isSmallScreen ? "Menu" : "Categories"}
          </h2>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            {categories.map((item) => (
              <Link
                key={item.name}
                className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded"
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
                    className="block py-2 px-4 text-gray-800 hover:bg-gray-200 rounded"
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
        {isSmallScreen && (
          <div className="p-4 border-t">
            <Link
              className="block py-2 px-4 text-blue-600 hover:bg-gray-200 rounded"
              href="#"
              onClick={() => setIsSideMenuOpen(false)}
            >
              Login
            </Link>
            <Button
              as={Link}
              className="mt-2 w-full"
              color="primary"
              href="#"
              variant="flat"
              onClick={() => setIsSideMenuOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
