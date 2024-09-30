"use client";

import { Button } from "@nextui-org/react";
import * as React from "react";
import { Select, SelectItem, SelectValue } from "@/components/custom-select";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const categories = ["SHIRTS", "DRESSES", "CARDIGANS", "JUPES"];
  const [selectedValue, setSelectedValue] = React.useState("featured");

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
          <Select defaultValue={selectedValue} onChange={setSelectedValue}>
            <SelectValue placeholder="Sort by" />
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl px-8 mx-auto mb-5">
          {[...Array(8)].map((_, index) => (
            <ProductCard
              key={index}
              isInCart
              isLiked
              description="Beautiful Dress"
              name="Dress"
              price="500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
