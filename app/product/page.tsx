"use client";
import { useState } from "react";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import { Image, Button } from "@nextui-org/react";

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#FF1493");

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  const colors = [
    { name: "Hot Pink", value: "#FF1493" },
    { name: "Deep Sky Blue", value: "#00BFFF" },
    { name: "Black", value: "#000000" },
    { name: "Light Sky Blue", value: "#87CEFA" },
    { name: "Yellow Green", value: "#9ACD32" },
    { name: "Tan", value: "#D2B48C" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            alt="Basic colored dress"
            className="rounded-lg object-cover w-full h-auto"
            height={500}
            src="https://scontent.fcai22-2.fna.fbcdn.net/v/t39.30808-6/455815435_813116620931890_8849671195779407477_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGx0HO6Gpo4fEUC8pk235Paf7Myk8ICN49_szKTwgI3jyxTq2n1ZL38Sz8_mtt7wKlEoldh7IzcmMLg29f3muj8&_nc_ohc=dF7LRjpnL0kQ7kNvgFCSjMI&_nc_ht=scontent.fcai22-2.fna&_nc_gid=AACpWsi0xKdUUq2pdYCA8eb&oh=00_AYCN6ij6ebzPopWZssjHWNTGFtxkYRaa_CXR-0aiJHpr0g&oe=66EDFA9C"
            width={450}
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">Basic colored dress</h1>
          <p className="text-xl font-bold mb-4">Price: 450 EGP</p>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Color:</h2>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <label
                  key={color.value}
                  aria-label={`Color ${color.name}`}
                  className="cursor-pointer"
                >
                  <input
                    checked={selectedColor === color.value}
                    className="sr-only peer"
                    name="color"
                    type="radio"
                    value={color.value}
                    onChange={() => setSelectedColor(color.value)}
                  />
                  <span
                    className="block w-8 h-8 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:ring-offset-2"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-green-500 font-semibold">Available in Stock</p>
            <p>Material: Cotton</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Size:</h2>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <label key={size} className="cursor-pointer">
                  <input
                    checked={selectedSize === size}
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value={size}
                    onChange={() => setSelectedSize(size)}
                  />
                  <span className="flex items-center justify-center rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-sm peer-checked:border-blue-500 peer-checked:text-blue-500 hover:bg-gray-50">
                    {size}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <span className="font-semibold">Quantity:</span>
            <button
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <Button
              disableRipple
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </Button>
            <Button
              disableRipple
              className="w-full border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded"
            >
              Buy Now
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <Button
              disableRipple
              className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              variant="flat"
            >
              <Heart className="mr-2 h-4 w-4" />
              Add to WISHLIST
            </Button>
            <Button
              disableRipple
              className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              variant="flat"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Fast Shipping (within 3-5 working days)</li>
              <li>Exchange and Return within 30 Days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
