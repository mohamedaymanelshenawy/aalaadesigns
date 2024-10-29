"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

import { Product } from "../types/types";

import { useCart } from "@/app/contexts/CartContext";
import { useUser } from "@/app/contexts/UserContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/ProductCard";

type CategoryFilter = {
  category?: number | null;
  subcategory?: number | null;
};

interface Category {
  id: number;
  name: string;
  description: string;
}

function LoadingAnimation() {
  return (
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
}

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const searchParams = useSearchParams();
  const { setCart } = useCart();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const categoryId = searchParams.get("category")
      ? parseInt(searchParams.get("category") as string, 10)
      : null;
    const subcategoryId = searchParams.get("subcategory")
      ? parseInt(searchParams.get("subcategory") as string, 10)
      : null;

    setSelectedCategory(categoryId);

    const filter: CategoryFilter = {
      category: categoryId,
      subcategory: subcategoryId,
    };

    fetchProducts(filter, page);
  }, [searchParams, page]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  async function fetchProducts(filter: CategoryFilter, currentPage: number) {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        ...(filter.category !== null &&
          filter.category !== undefined && {
            category: filter.category.toString(),
          }),
        ...(filter.subcategory !== null &&
          filter.subcategory !== undefined && {
            subcategory: filter.subcategory.toString(),
          }),
      });

      const response = await fetch(`/api/products?${queryParams.toString()}`);
      const fetchedProductsData = await response.json();

      setProducts(fetchedProductsData.products);
      setTotalProducts(fetchedProductsData.totalProducts);
      setTotalPages(fetchedProductsData.totalPages);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch(`/api/products/categories`);
      const data = await response.json();

      setFetchedCategories(data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  }

  const fetchCartItems = async () => {
    if (user) {
      try {
        const fetchCartItems = await fetch(`/api/cart?userId=${user.id}`);
        const cartData = await fetchCartItems.json();

        if (cartData && cartData.items) {
          setCart(cartData);
        }
      } catch (error) {}
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchProducts({ category: selectedCategory, subcategory: null }, newPage);
  };

  const handleCategoryChange = (category: number | null) => {
    setSelectedCategory(category);
    setPage(1);
    fetchProducts({ category, subcategory: null }, 1);
  };

  const SkeletonPulse = () => (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      className="w-full h-[350px] bg-gray-200 rounded"
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  if (error) {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full">
        <nav className="flex flex-wrap justify-center items-center pb-4 mb-7">
          <Button
            key="all"
            className="font-semibold text-sm sm:text-base lg:text-lg mx-1 sm:mx-2 my-1"
            variant="light"
            onClick={() => handleCategoryChange(null)}
          >
            All
          </Button>
          {fetchedCategories.map((category) => (
            <Button
              key={category.id}
              className="font-semibold text-sm sm:text-base lg:text-lg mx-1 sm:mx-2 my-1"
              variant="light"
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </nav>
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm px-4 mb-7 sm:px-6 lg:px-8">
          {products && (
            <p className="text-gray-600 mb-2 sm:mb-0">
              SHOWING {products.length} of {totalProducts} RESULTS
            </p>
          )}
        </div>
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto mb-5">
          {isLoading ? (
            Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-full">
                  <SkeletonPulse />
                </div>
              ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                description={product.description}
                id={product.id}
                image_path="/shirt.png"
                link={`/products/${product.id}`}
                name={product.name}
                price={product.price}
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
                className={`cursor-pointer ml-2 ${
                  page === totalPages ? "hidden" : ""
                }`}
                onClick={() => handlePageChange(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <ShopContent />
    </Suspense>
  );
}
