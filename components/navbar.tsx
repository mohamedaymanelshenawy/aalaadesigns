"use client";
//import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Menu } from "lucide-react";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

import Shoppingbag from "@/components/svgs/Shoppingbag";
import SearchIcon from "@/components/svgs/SearchIcon";

function SearchInput() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 8,
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{ "aria-label": "search" }}
        placeholder="Search…"
      />
    </Search>
  );
}

function CustomNavBar() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutPageHref = "/about";
  const cartPageHref = "/cart";

  const menuItems = [
    { name: "Home", href: "." },
    { name: "Cart", href: cartPageHref, icon: <Shoppingbag /> },
    { name: "About", href: aboutPageHref },
  ];
  const categories = [
    { name: "skirt", href: "#" },
    { name: "Jupes", href: "#" },
    { name: "Dress", href: "#" },
    { name: "Cardigans", href: "#" },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      className="p-3 w-full md:w-full rounded-lg backdrop-blur-md mx-auto bg-white bg-opacity-10 hover:bg-opacity-30 duration-300 hover:shadow-lg"
    >
      <Dropdown>
        <DropdownTrigger>
          <Button disableRipple className="p-0 bg-transparent" variant="light">
            <Menu size={24} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Mobile navigation menu">
          {categories.map((item) => (
            <DropdownItem key={item.name}>
              <Link
                className={`w-full ${"bg-primary text-white px-4 py-2 rounded"}`}
                href={item.href}
              >
                {item.name}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <NavbarBrand>
        <Link
          className="font-bold text-inherit text-2xl md:text-4xl hover:text-grey-900"
          href="."
        >
          Aalaa Designs
        </Link>
      </NavbarBrand>

      {/* Desktop menu */}
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        <SearchInput />
        {menuItems.slice(0, 4).map((item) => (
          <NavbarItem
            key={item.name}
            className="hover:bg-none hover:scale-110 duration-300"
          >
            <Button
              disableRipple
              as={Link}
              className="hover:bg-blue-700 hover:text-blue-600"
              color="primary"
              href={item.href}
              variant="light"
            >
              {item.icon}
              <p className="text-lg">{item.name}</p>
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem>
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            disableRipple
            as={Link}
            color="primary"
            href="#"
            variant="flat"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarContent className="md:hidden" justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent"
              variant="light"
            >
              <Menu size={24} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Mobile navigation menu">
            {menuItems.map((item) => (
              <DropdownItem key={item.name}>
                <Link
                  className={`w-full ${"bg-primary text-white px-4 py-2 rounded"}`}
                  href={item.href}
                >
                  {item.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default CustomNavBar;
