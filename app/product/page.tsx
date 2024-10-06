"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Image } from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const ColorOption = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => (
  <div
    className={`w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-200 ${className}`}
    style={{ backgroundColor: color }}
  />
);
const SizeOption = ({
  size,
  selected,
  onClick,
}: {
  size: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    className={`px-4 py-2 border-2 rounded-full transition-colors duration-400 ${
      selected ? "  border-red-800" : "  border-gray-300 hover:border-red-500"
    }`}
    type="button"
    onClick={onClick}
  >
    {size}
  </button>
);

const ProductImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <Image
    alt={alt}
    className={`object-cover rounded-lg shadow-md transition-transform duration-300 ${className}`}
    src={src}
  />
);

const RelatedProduct = ({
  src,
  alt,
  title,
  price,
  classname,
}: {
  src: string;
  alt: string;
  title: string;
  price: string;
  classname?: string;
}) => (
  <Card
    className={`overflow-hidden transition-shadow duration-300 hover:shadow-lg ${classname}`}
  >
    <CardContent className="p-0">
      <ProductImage
        alt={alt}
        className="w-full h-60 object-cover object-top"
        src={src}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="">{price} EGP</p>
      </div>
    </CardContent>
  </Card>
);

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const { theme } = useTheme();

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colors = ["#8A9A5B", "#FFA500", "#000000", "#FFC0CB"];

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value) && value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

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
            <div className="rounded overflow-hidden">
              <ProductImage
                alt="Dress thumbnail 1"
                className="w-full h-56 rounded"
                src="/arrival2.png"
              />
            </div>
            <div className="rounded overflow-hidden">
              <ProductImage
                alt="Dress thumbnail 2"
                className="w-full h-56 rounded"
                src="/dress.png"
              />
            </div>
            <div className="rounded overflow-hidden">
              <ProductImage
                alt="Dress thumbnail 3"
                className="w-full h-56 rounded"
                src="/dress.png"
              />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Basic colored dress</h1>
            <p className="text-2xl font-semibold ">450 EGP</p>
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
            <h2 className="text-lg font-semibold mb-2">🟢Available in Stock</h2>
            <p className="">Material: Cotton</p>
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
            <div className="flex items-center space-x-2">
              <Button
                className={`pt-1  text-xl rounded-full text-center hover:bg-opacity-80 ${theme === "light" ? "border-white" : "border-red-800"}`}
                variant="outline"
                onClick={decrementQuantity}
              >
                -
              </Button>
              <Input
                className={`w-14 rounded-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme === "light" ? "border-black" : "border-red-800"}`}
                max="99"
                min="1"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <Button
                className={`text-xl rounded-full text-center hover:bg-opacity-80 ${theme === "light" ? "border-white" : "border-red-800"}`}
                variant="outline"
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Button
              className={`w-full rounded py-3 text-lg ${theme === "light" ? "border-black" : "border-red-800"}`}
              variant="outline"
            >
              Add to Cart
            </Button>
            <Button
              className={`w-full rounded py-3 text-lg ${theme === "light" ? "border-black" : "border-red-800"}`}
              variant="outline"
            >
              Buy Now
            </Button>
          </div>
          <div className=" p-6 rounded-xl">
            <p className="text-sm space-y-2">
              <span className="block">
                ✓ Get shipping within 3-4 working days
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
            classname={theme === "light" ? "border-black" : "border-red-800"}
            price="450"
            src="/dress.png"
            title="Elegant White Shirt"
          />
          <RelatedProduct
            alt="Cardigan"
            classname={theme === "light" ? "border-black" : "border-red-800"}
            price="450"
            src="/dress.png"
            title="Cozy Knit Cardigan"
          />
          <RelatedProduct
            alt="Dress"
            classname={theme === "light" ? "border-black" : "border-red-800"}
            price="450"
            src="/dress.png"
            title="Floral Summer Dress"
          />
        </div>
        <div className="mt-10 text-center">
          <Button
            className="px-8 py-3 text-lg  rounded border-black   hover:bg-opacity-90 "
            variant="outline"
          >
            Explore more
          </Button>
        </div>
      </div>
    </div>
  );
}
