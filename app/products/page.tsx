/* eslint-disable no-console */
"use client";

import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import styles from "./products.module.css";

import ProductCard from "@/components/ProductCard";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";

type SelectionOption = "shirts" | "dresses" | "cardigans";

type Product = {
  name: string;
  description: string;
  price: number;
  stock: number;
  createdat: string;
  image_path: string;
  id: number;
  categoryid: number;
  material: string;
  subcategoryid: number;
};

const LoadingAnimation = () => (
  <div className={styles.loadingContainer}>
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className={styles.loadingDot}
        style={{
          animationDelay: `${index * 0.2}s`,
        }}
      />
    ))}
  </div>
);

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const categories = ["SHIRTS", "DRESSES", "CARDIGANS", "JUPES"];
  const [selectedOption, setSelectedOption] = useState<Set<SelectionOption>>(
    () => new Set<SelectionOption>(["shirts"])
  );

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
          <p className="text-gray-600">
            SHOWING {products.length} of 110 RESULTS
          </p>
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
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <LoadingAnimation />
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                description={product.description}
                image_path={product.image_path}
                isInCart={true}
                isLiked={false}
                name={product.name}
                price={`${product.price}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
}
