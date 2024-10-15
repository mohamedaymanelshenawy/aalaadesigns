"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/ProductCard";
import { ChevronDownIcon } from "@/components/ui/ChevronDownIcon";

type SelectionOption = "shirts" | "dresses" | "cardigans";
type CategoryFilter = {
  category?: number;
  subcategory?: number;
};
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
  <div className="flex justify-center items-center space-x-2">
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category")
    ? parseInt(searchParams.get("category") as string, 10)
    : undefined;
  const subcategoryId = searchParams.get("subcategory")
    ? parseInt(searchParams.get("subcategory") as string, 10)
    : undefined;

  const filter: CategoryFilter = {
    category: categoryId,
    subcategory: subcategoryId,
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          page: page.toString(),
          ...(filter.category && { category: filter.category.toString() }),
          ...(filter.subcategory && {
            subcategory: filter.subcategory.toString(),
          }),
        });
        const response = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await response.json();

        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [page, filter.category, filter.subcategory]);

  const categories = ["SHIRTS", "DRESSES", "CARDIGANS", "JUPES"];
  const [selectedOption, setSelectedOption] = useState<Set<SelectionOption>>(
    () => new Set<SelectionOption>(["shirts"])
  );

  const descriptionsMap: Record<SelectionOption, string> = {
    shirts: "All new shirts",
    dresses: "All new Dresses",
    cardigans: "All new Cardigans",
  };

  const labelsMap: Record<SelectionOption, string> = {
    shirts: "Choose new shirt",
    dresses: "Choose new dress",
    cardigans: "Choose new Cardigan",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
            SHOWING {products.length} of {totalProducts} RESULTS
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
                id={product.id}
                image_path={product.image_path}
                isInCart={false}
                link={`/products/${product.id}`}
                name={product.name}
                price={`${product.price}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center">No products found</div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`mr-2 cursor-pointer ${page === 1 ? "hidden" : ""}`}
                onClick={() => handlePageChange(page - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className="cursor-pointer mx-1"
                    isActive={pageNumber === page}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ml-2 ${page === totalPages ? "hidden" : ""}`}
                onClick={() => handlePageChange(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
