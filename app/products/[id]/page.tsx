"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: string[];
  sizes: string[];
  images: string[];
  material: string;
  inStock: boolean;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}
const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = ["#FF0000", "#00FF00", "#0000FF"];

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const productResponse = await fetch(`/api/products/product?id=${id}`);
        const productData = await productResponse.json();
        setProduct(productData);
        //setSelectedSize(productData.sizes[0]);
        //setSelectedColor(productData.colors[0]);

        //const relatedResponse = await fetch(`/api/products/${id}/related`);
        //const relatedData = await relatedResponse.json();
        //setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value) && value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="w-full h-[600px] rounded-xl" />
          <div className="space-y-8">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <Image
            alt={product.name}
            className="w-full h-[600px] rounded-xl object-cover"
            height={600}
            //src={product.images[0]}
            src="/arrival1.png"
            width={600}
          />
          <div className="grid grid-cols-3 gap-4">
            {/*{product.images.slice(1, 4).map((image, index) => (
              <div key={index} className="rounded overflow-hidden">
                <Image
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-56 rounded object-cover"
                  height={224}
                  src={image}
                  width={200}
                />
              </div>
            ))}*/}
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold">{product.price} EGP</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Color</h2>
            <RadioGroup
              className="flex space-x-4"
              defaultValue={selectedColor}
              onValueChange={setSelectedColor}
            >
              {colors.map((color, index) => (
                <div key={index}>
                  <RadioGroupItem
                    className="sr-only peer"
                    id={`color-${index}`}
                    value={color}
                  />
                  <Label className="cursor-pointer" htmlFor={`color-${index}`}>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-200 peer-checked:border-black"
                      style={{ backgroundColor: color }}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              🟢 Available in Stock
            </h2>
            <p>Material: {product.material}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Size</h2>
            <RadioGroup
              className="flex flex-wrap gap-3"
              defaultValue={selectedSize}
              onValueChange={setSelectedSize}
            >
              {sizes.map((size) => (
                <div key={size}>
                  <RadioGroupItem
                    className="sr-only peer"
                    id={`size-${size}`}
                    value={size}
                  />
                  <Label
                    className="px-4 py-2 border-2 rounded-full transition-colors duration-400 cursor-pointer peer-checked:border-primary hover:border-primary"
                    htmlFor={`size-${size}`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Quantity</h2>
            <div className="flex items-center space-x-2">
              <Button
                className="rounded-full"
                size="icon"
                variant="outline"
                onClick={decrementQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                className="w-14 rounded-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                max="99"
                min="1"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <Button
                className="rounded-full"
                size="icon"
                variant="outline"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Add to Cart
            </Button>
            <Button className="w-full" size="lg" variant="secondary">
              Buy Now
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm space-y-2">
                <span className="block">
                  ✓ Get shipping within 3-4 working days
                </span>
                <span className="block">
                  ✓ Exchange and Return within 30 Days
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-0">
                  <Image
                    alt={product.name}
                    className="w-full h-60 object-cover object-top"
                    height={240}
                    src={product.image}
                    width={300}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p>{product.price} EGP</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" variant="outline">
              Explore more
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
