"use client";

import * as React from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import ProductCard from "@/components/ProductCard";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";

type SelectionOption = "shirts" | "dresses" | "cardigans";

export default function Shop() {
  const categories = ["SHIRTS", "DRESSES", "CARDIGANS", "JUPES"];
  const [selectedOption, setSelectedOption] = React.useState<
    Set<SelectionOption>
  >(() => new Set<SelectionOption>(["shirts"]));

  const descriptionsMap: Record<SelectionOption, string> = {
    shirts: "All new shirts",
    dresses: "All new Dresses.",
    cardigans: "All new Cardigans.",
  };

  const labelsMap: Record<SelectionOption, string> = {
    shirts: "Choose new shirt",
    dresses: "Choose new dress",
    cardigans: "Choose new Cardigan",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full">
        <nav className="flex justify-center items-center pb-4 mb-7">
          {categories.map((category) => (
            <Button
              key={category}
              className="font-semibold text-lg mx-2"
              variant="light"
            >
              {category}
            </Button>
          ))}
        </nav>
        <div className="flex justify-between items-center text-sm px-4 mb-7 sm:px-6 lg:px-8">
          <p className="text-gray-600">SHOWING 19 of 110 RESULTS</p>
          <ButtonGroup variant="flat">
            <Button>
              {selectedOptionValue
                ? labelsMap[selectedOptionValue]
                : "Select option"}
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="options"
                className="max-w-[300px]"
                selectedKeys={selectedOption}
                selectionMode="single"
                onSelectionChange={(keys) =>
                  setSelectedOption(keys as Set<SelectionOption>)
                }
              >
                {(Object.keys(labelsMap) as SelectionOption[]).map((key) => (
                  <DropdownItem key={key} description={descriptionsMap[key]}>
                    {labelsMap[key]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl px-8 mx-auto mb-5">
          {[...Array(8)].map((_, index) => (
            <ProductCard
              key={index}
              description="Beautiful Dress"
              isInCart={true}
              isLiked={true}
              name="Dress"
              price="500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
