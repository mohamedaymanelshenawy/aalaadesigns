/* eslint-disable react/no-unknown-property */
"use client";

import type { Product } from "../types/types";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
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
  const { setCart, addToCart } = useCart();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [layoutView, setLayoutView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const categoryId = searchParams.get("category")
      ? Number.parseInt(searchParams.get("category") as string, 10)
      : null;
    const subcategoryId = searchParams.get("subcategory")
      ? Number.parseInt(searchParams.get("subcategory") as string, 10)
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

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleCheckoutNow = (product: Product) => {
    addToCart(product);
    // Navigate to checkout page or open checkout modal
    // This is a placeholder - implement actual checkout logic
    console.log("Checkout now with product:", product);
  };

  const SkeletonPulse = () => (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      className="w-full h-[350px] bg-gray-200 rounded-[20px]"
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );

  if (error) {
    return <div>Error loading products. Please try again later.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
        Clothings
      </h1>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-6">
        <Button
          className="w-full rounded-full shadow-sm hover:shadow-md transition-all"
          variant="outline"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar - Filters */}
        <div
          className={`lg:w-1/4 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}
        >
          <div className="space-y-10 bg-white p-6 rounded-2xl shadow-sm">
            {/* Sort */}
            <div>
              <h3 className="font-bold mb-4 text-gray-800 text-lg">Sort</h3>
              <RadioGroup value={sortBy} onValueChange={setSortBy}>
                <div className="space-y-3">
                  {[
                    "Newest",
                    "Oldest",
                    "Recommended",
                    "Availability",
                    "Price (Low to High)",
                    "Price (High to Low)",
                  ].map((option) => (
                    <div key={option} className="flex items-center">
                      <RadioGroupItem
                        id={option.toLowerCase().replace(/\s+/g, "-")}
                        value={option.toLowerCase().replace(/\s+/g, "-")}
                      />
                      <Label
                        className="ml-2 cursor-pointer text-gray-700"
                        htmlFor={option.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold mb-4 text-gray-800 text-lg">Price</h3>
              <div className="p-4">
                {
                  // react/no-unknown-property
                }
                <style global jsx>{`
                  .slider-track {
                    height: 4px !important;
                    background-color: #000 !important;
                  }
                  .slider-range {
                    background-color: #666 !important;
                  }
                  .slider-thumb {
                    background-color: white !important;
                    border: 2px solid black !important;
                    width: 16px !important;
                    height: 16px !important;
                  }
                `}</style>
                <Slider
                  className="mb-4 slider-track"
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="text-sm font-medium text-gray-700 flex justify-between">
                  <span>{priceRange[0]} EGP</span>
                  <span>{priceRange[1]} EGP</span>
                </div>
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="font-bold mb-4 text-gray-800 text-lg">Color</h3>
              <div className="space-y-3">
                {[
                  "Multi",
                  "Black",
                  "White",
                  "Beige",
                  "Olive",
                  "Red",
                  "Pink",
                  "Blue",
                  "Grey",
                  "Purple",
                ].map((color) => (
                  <div key={color} className="flex items-center">
                    <Checkbox
                      checked={selectedColors.includes(color.toLowerCase())}
                      id={`color-${color.toLowerCase()}`}
                      onCheckedChange={(checked: any) => {
                        if (checked) {
                          setSelectedColors([
                            ...selectedColors,
                            color.toLowerCase(),
                          ]);
                        } else {
                          setSelectedColors(
                            selectedColors.filter(
                              (c) => c !== color.toLowerCase()
                            )
                          );
                        }
                      }}
                    />
                    <Label
                      className="ml-2 cursor-pointer text-gray-700"
                      htmlFor={`color-${color.toLowerCase()}`}
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold mb-4 text-gray-800 text-lg">
                Categories
              </h3>
              <div className="space-y-4">
                <div className="font-medium text-gray-800">Clothings</div>
                <div className="ml-4 space-y-3">
                  {[
                    "Basic",
                    "Dresses",
                    "Abbayas",
                    "Tunics",
                    "Tops",
                    "Skirts",
                  ].map((cat) => (
                    <div key={cat} className="flex items-center">
                      <Checkbox id={`cat-${cat.toLowerCase()}`} />
                      <Label
                        className="ml-2 cursor-pointer text-gray-700"
                        htmlFor={`cat-${cat.toLowerCase()}`}
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="font-medium text-gray-800 mt-4">
                  Accessories
                </div>
                <div className="ml-4 space-y-3">
                  {["Scarves", "Jewelry", "Bags"].map((cat) => (
                    <div key={cat} className="flex items-center">
                      <Checkbox id={`cat-${cat.toLowerCase()}`} />
                      <Label
                        className="ml-2 cursor-pointer text-gray-700"
                        htmlFor={`cat-${cat.toLowerCase()}`}
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="font-medium text-gray-800 mt-4">Outwear</div>
                <div className="ml-4 space-y-3">
                  {["Jackets", "Coats", "Blazers"].map((cat) => (
                    <div key={cat} className="flex items-center">
                      <Checkbox id={`cat-${cat.toLowerCase()}`} />
                      <Label
                        className="ml-2 cursor-pointer text-gray-700"
                        htmlFor={`cat-${cat.toLowerCase()}`}
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="font-medium text-gray-800 mt-4">Knitwear</div>
                <div className="ml-4 space-y-3">
                  {["Sweaters", "Cardigans", "Hoodies"].map((cat) => (
                    <div key={cat} className="flex items-center">
                      <Checkbox id={`cat-${cat.toLowerCase()}`} />
                      <Label
                        className="ml-2 cursor-pointer text-gray-700"
                        htmlFor={`cat-${cat.toLowerCase()}`}
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Results count and view options */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
            <div className="text-sm font-medium text-gray-600">
              Showing {products.length} out of {totalProducts} results
            </div>
            <div className="flex space-x-2">
              <button
                aria-label="Grid view"
                className={`p-2 rounded-lg transition-all ${
                  layoutView === "grid"
                    ? "bg-primary/10 text-primary border border-primary"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setLayoutView("grid")}
              >
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="7" width="7" x="3" y="3" />
                  <rect height="7" width="7" x="14" y="3" />
                  <rect height="7" width="7" x="3" y="14" />
                  <rect height="7" width="7" x="14" y="14" />
                </svg>
              </button>
              <button
                aria-label="List view"
                className={`p-2 rounded-lg transition-all ${
                  layoutView === "list"
                    ? "bg-primary/10 text-primary border border-primary"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setLayoutView("list")}
              >
                <svg
                  fill="none"
                  height="18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="21" x2="3" y1="6" y2="6" />
                  <line x1="21" x2="3" y1="12" y2="12" />
                  <line x1="21" x2="3" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={
              layoutView === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-8"
            }
          >
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
                <div
                  key={product.id}
                  className={`
                    bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300
                    ${layoutView === "list" ? "flex" : "flex flex-col"}
                  `}
                >
                  <div
                    className={`relative ${layoutView === "list" ? "w-1/3" : ""}`}
                  >
                    <div className="overflow-hidden">
                      <Image
                        alt={product.name}
                        className={`
                          w-full object-cover transition-transform duration-500 hover:scale-105
                          ${layoutView === "list" ? "h-[200px] rounded-l-3xl" : "h-auto rounded-t-3xl"}
                        `}
                        height={layoutView === "list" ? 200 : 400}
                        src="/shirt.png"
                        width={300}
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      New
                    </div>
                  </div>
                  <div
                    className={`p-5 ${layoutView === "list" ? "w-2/3 flex flex-col" : ""}`}
                  >
                    <h3 className="text-lg font-medium mb-2 text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-base font-bold mb-3 text-gray-900">
                      {product.price} EGP
                    </p>
                    {layoutView === "list" && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    {/* Buttons Container */}
                    <div
                      className={`
                      ${layoutView === "list" ? "flex space-x-3 mt-auto" : "flex flex-col space-y-3 mt-3"}
                    `}
                    >
                      {/* Add to Cart Button */}
                      <button
                        className={`
                          text-sm font-medium py-3 px-4 rounded-full bg-white border border-gray-300 
                          hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center
                          ${layoutView === "list" ? "flex-1" : "w-full"}
                        `}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>

                      {/* Checkout Now Button */}
                      <button
                        className={`
                          text-sm font-bold py-3 px-4 rounded-full bg-red-600 text-white
                          hover:bg-red-700 transition-all duration-300 flex items-center justify-center
                          ${layoutView === "list" ? "flex-1" : "w-full"}
                        `}
                        onClick={() => handleCheckoutNow(product)}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Checkout Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No products found
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`cursor-pointer rounded-full ${page === 1 ? "hidden" : ""}`}
                    onClick={() => handlePageChange(page - 1)}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        className="cursor-pointer rounded-full"
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
                    className={`cursor-pointer rounded-full ${page === totalPages ? "hidden" : ""}`}
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
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
