"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { addToCart } from "@/app/util/utils";
import { useCart } from "@/app/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/app/contexts/UserContext";
import {
  Cart as ImportedCart,
  CartItem as ImportedCartItem,
} from "@/app/types/types";

interface ColorAndSize {
  color: string;
  sizes: string[];
}

interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  createdat: string;
  image_path: string;
  categoryid: number;
  material: string;
  subcategoryid: number;
  colors_and_sizes: ColorAndSize[];
}

interface RelatedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdat: string;
  image_path: string;
  categoryid: number;
  material: string;
  subcategoryid: number;
}

type ExtendedCartItem = ImportedCartItem & Partial<Product>;

type ExtendedCart = Omit<ImportedCart, "items"> & {
  items: ExtendedCartItem[];
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products/product?id=${id}`);
        const data = await response.json();

        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);

        if (data.product.colors_and_sizes.length > 0) {
          setSelectedColor(data.product.colors_and_sizes[0].color);
          setSelectedSize(data.product.colors_and_sizes[0].sizes[0]);
        }
      } catch (error) {
        setError("Failed to load product data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (product && cart && cart.items) {
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].id === product.product_id) {
          setIsInCart(true);
        }
      }
    }
  }, [product, cart]);

  const incrementQuantity = () =>
    setQuantity((prev) => Math.min(prev + 1, product?.stock || 99));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (!isNaN(value) && value >= 1 && value <= (product?.stock || 99)) {
      setQuantity(value);
    }
  };

  const handleCartClick = async () => {
    if (!product) return;

    setIsLoading(true);
    try {
      const response = await addToCart({
        productId: product.product_id,
        count: quantity,
        user: user,
      });

      if (response && response.status === 200) {
        setCart((prevCart: ExtendedCart) => ({
          ...prevCart,
          items: [
            ...(prevCart?.items || []),
            {
              ...product,
              count: quantity,
            } as ExtendedCartItem,
          ],
        }));
        setIsInCart(true);
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
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
            alt={product.product_name}
            className="w-full h-[600px] rounded-xl object-cover"
            height={600}
            src={"/shirt.png"}
            width={600}
          />
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
            <p className="text-2xl font-semibold">{product.price} EGP</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Color</h2>
            <RadioGroup
              className="flex space-x-4"
              defaultValue={selectedColor}
              onValueChange={setSelectedColor}
            >
              {product.colors_and_sizes.map((colorSize, index) => (
                <div key={index}>
                  <RadioGroupItem
                    className="sr-only peer"
                    id={`color-${index}`}
                    value={colorSize.color}
                  />
                  <Label className="cursor-pointer" htmlFor={`color-${index}`}>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-200 peer-checked:border-black"
                      style={{ backgroundColor: colorSize.color.toLowerCase() }}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              {product.stock > 0 ? "🟢 Available in Stock" : "🔴 Out of Stock"}
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
              {product.colors_and_sizes
                .find((cs) => cs.color === selectedColor)
                ?.sizes.map((size) => (
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
                max={product.stock}
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
            <Button
              className="w-full"
              disabled={isLoading || product.stock === 0 || isInCart}
              size="lg"
              onClick={handleCartClick}
            >
              {isLoading
                ? "Adding to Cart..."
                : isInCart
                  ? "Item already in cart"
                  : "Add to Cart"}
            </Button>
            <Button
              className="w-full"
              disabled={product.stock === 0}
              size="lg"
              variant="secondary"
            >
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
              <Card
                key={product.id}
                className="rounded overflow-clip"
                onClick={() => {
                  router.push(`../products/${product.id}`);
                }}
              >
                <CardContent className="p-0">
                  <Image
                    alt={product.name}
                    className="w-full h-60 object-cover object-top"
                    height={240}
                    src={"/shirt.png"}
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
