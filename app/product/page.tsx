"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ColorOption = ({ color, className }) => (
  <div
    className={`w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-200 ${className}`}
    style={{ backgroundColor: color }}
  />
);

const SizeOption = ({ size, selected, onClick }) => (
  <button
    className={`px-4 py-2 border-2 rounded-md transition-colors duration-200 ${selected ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}`}
    onClick={onClick}
  >
    {size}
  </button>
);

const ProductImage = ({ src, alt, className }) => (
  <img
    alt={alt}
    className={`object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
    src={src}
  />
);

const RelatedProduct = ({ src, alt, title, price }) => (
  <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
    <CardContent className="p-0">
      <ProductImage alt={alt} className="w-full h-60 object-cover" src={src} />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{price} EGP</p>
      </div>
    </CardContent>
  </Card>
);

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colors = ["#8A9A5B", "#FFA500", "#000000", "#FFC0CB"];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <ProductImage
            alt="Basic colored dress"
            className="w-full h-[600px] rounded-xl"
            src="/arrival1.png"
          />
          <div className="grid grid-cols-3 gap-4">
            <ProductImage
              alt="Dress thumbnail 1"
              className="w-full h-32 rounded"
              src="/arrival2.png"
            />
            <ProductImage
              alt="Dress thumbnail 2"
              className="w-full h-32 rounded"
              src="/dress.png"
            />
            <ProductImage
              alt="Dress thumbnail 3"
              className="w-full h-32 rounded-lg"
              src="/dress.png"
            />
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Basic colored dress</h1>
            <p className="text-2xl font-semibold text-gray-700">450 EGP</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Color</h2>
            <RadioGroup className="flex space-x-4" defaultValue="green">
              {colors.map((color, index) => (
                <RadioGroupItem
                  key={index}
                  className="sr-only peer"
                  id={`color-${index}`}
                  value={color}
                >
                  <label className="cursor-pointer" htmlFor={`color-${index}`}>
                    <ColorOption
                      className="peer-checked:border-black"
                      color={color}
                    />
                  </label>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Available in Stock</h2>
            <p className="text-gray-600">Material: Cotton</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Size</h2>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <SizeOption
                  key={size}
                  selected={selectedSize === size}
                  size={size}
                  onClick={() => setSelectedSize(size)}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Quantity</h2>
            <Select
              value={quantity.toString()}
              onValueChange={(value) => setQuantity(parseInt(value))}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg">
              Add to Cart
            </Button>
            <Button
              className="w-full border-black text-black hover:bg-gray-100 py-3 text-lg"
              variant="outline"
            >
              Buy Now
            </Button>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl">
            <p className="text-sm space-y-2">
              <span className="block">
                ✓ Get shipping within 24 working hours
              </span>
              <span className="block">
                ✓ Exchange and Return within 30 Days
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RelatedProduct
            alt="White shirt"
            price="450"
            src="/dress.png"
            title="Elegant White Shirt"
          />
          <RelatedProduct
            alt="Cardigan"
            price="450"
            src="/dress.png"
            title="Cozy Knit Cardigan"
          />
          <RelatedProduct
            alt="Dress"
            price="450"
            src="/dress.png"
            title="Floral Summer Dress"
          />
        </div>
        <div className="mt-10 text-center">
          <Button
            className="px-8 py-3 text-lg bg-black rounded border-black text-white hover:bg-gray-100"
            variant="outline"
          >
            Explore more
          </Button>
        </div>
      </div>
    </div>
  );
}
