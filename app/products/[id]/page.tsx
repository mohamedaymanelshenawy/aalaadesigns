"use client";

import type React from "react";
import type {
  Cart as ImportedCart,
  CartItem as ImportedCartItem,
} from "@/app/types/types";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, Heart, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { addToCart } from "@/app/util/utils";
import { useCart } from "@/app/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/app/contexts/UserContext";

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
  const [wishlist, setWishlisted] = useState(false);

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
    const value = Number.parseInt(e.target.value);

    if (!isNaN(value) && value >= 1 && value <= (product?.stock || 99)) {
      setQuantity(value);
    }
  };

  const handleWishListed = () => {
    setWishlisted(!wishlist);
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <Image
            alt={product.product_name}
            className="w-[800px] h-auto object-fill border rounded-lg"
            height={600}
            src={"/shirt.png"}
            width={600}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6 border rounded-lg p-6">
          <div>
            <h1 className="text-2xl font-bold">{product.product_name}</h1>
            <div className="flex mt-2">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-red-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg
                className="w-5 h-5 text-gray-300 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-center border border-gray-400 rounded shadow w-[180px]">
            <span className="text-sm font-medium">Price : </span>
            <span className="ml-2 text-lg font-semibold">
              {product.price} EGP
            </span>
          </div>

          <div>
            <h2 className="text-sm font-medium mb-3">Available Colors</h2>
            <RadioGroup
              className="flex space-x-3"
              value={selectedColor}
              onValueChange={setSelectedColor}
            >
              {product.colors_and_sizes.map((colorSize, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="sr-only"
                    id={`color-${index}`}
                    value={colorSize.color}
                  />
                  <Label className="cursor-pointer" htmlFor={`color-${index}`}>
                    <div
                      className={`w-8 h-8 rounded-full ${
                        selectedColor === colorSize.color
                          ? "ring-2 ring-offset-2 ring-black"
                          : ""
                      }`}
                      style={{ backgroundColor: colorSize.color.toLowerCase() }}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium text-green-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 13L9 17L19 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Available In Stock
            </span>
          </div>

          <div>
            <h2 className="text-sm font-medium mb-3">Size Guide</h2>
            <RadioGroup
              className="grid grid-cols-6 gap-2"
              value={selectedSize}
              onValueChange={setSelectedSize}
            >
              {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                <div key={size}>
                  <RadioGroupItem
                    className="sr-only peer"
                    id={`size-${size}`}
                    value={size}
                  />
                  <Label
                    className={`flex items-center justify-center w-[100px] h-10 border rounded transition-colors duration-200 cursor-pointer hover:border-gray-400 ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-black"
                    }`}
                    htmlFor={`size-${size}`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex items-center gap-[14px]">
            <h2 className="text-[20px] font-normal mb-1 ">Quantity</h2>
            <div className="flex items-center justify-center rounded border border-gray-500 w-[170px]">
              <Button
                className="h-10 w-10 rounded border-none bg-transparent text-black"
                variant="outline"
                onClick={decrementQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                className="w-14 h-10 mx-2 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                max={product.stock}
                min="1"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <Button
                className="h-10 w-10 rounded-md border-none bg-transparent text-black "
                variant="outline"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-12 rounded bg-white text-black border border-black hover:bg-gray-200"
              disabled={isLoading || product.stock === 0 || isInCart}
              variant="outline"
              onClick={handleCartClick}
            >
              {isLoading
                ? "Adding to Cart..."
                : isInCart
                  ? "Item already in cart"
                  : "Add To Cart"}
            </Button>
            <Button
              className="w-full h-12 rounded text-white bg-black hover:bg-gray-800"
              disabled={product.stock === 0}
              variant="default"
            >
              Buy Now
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center text-sm"
              type="button"
              onClick={handleWishListed}
            >
              <Heart
                className={" w-4 h-4 mr-1 "}
                fill={wishlist ? "red" : "none"}
                stroke={wishlist ? "red" : "black"}
              />
              Add to Wishlist
            </button>
            <button className="flex items-center text-sm" type="button">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
          </div>

          <div className="flex border rounded-[15px] overflow-hidden">
            <div className="w-1/2 p-4 border-r">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Product Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Type</div>
                <div>Dress</div>
                <div className="text-gray-500">Material</div>
                <div>{product.material}</div>
                <div className="text-gray-500">Pattern</div>
                <div>Solid</div>
                <div className="text-gray-500">Fit</div>
                <div>Relaxed</div>
                <div className="text-gray-500">Color</div>
                <div>{selectedColor}</div>
                <div className="text-gray-500">Length</div>
                <div>Regular</div>
              </div>
            </div>

            <div className="w-1/2 p-4 flex flex-col justify-center">
              <div className="flex items-center p-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="text-sm">Fast Shipping (Within 3-5 Days)</div>
              </div>
              <div className="flex items-center p-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="text-sm">All over Egypt</div>
              </div>
              <div className="flex items-center p-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <div className="text-sm">Available in all Arab countries</div>
              </div>
            </div>
          </div>

          <div className="flex items-center p-2">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <div>
              <div className="text-sm">Return And Exchange</div>
              <Button className="text-xs underline text-blue-600 hover:text-blue-800">
                check our Return and exchange policy
              </Button>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <div className="mb-10 mt-16 flex justify-center items-center">
            <div className="h-[2px] rounded bg-gray-300 w-3/4" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              You may also like
            </h2>
            <div className="flex flex-wrap justify-start gap-8 mb-28">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="cursor-pointer w-[380px] h-[650px] flex flex-col"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    router.push(`../products/${product.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      router.push(`../products/${product.id}`);
                    }
                  }}
                >
                  <div className="flex-1">
                    <Image
                      alt={product.name}
                      className="w-full h-full object-cover rounded-[30px]"
                      height={550}
                      src={"/shirt.png"}
                      width={380}
                    />
                  </div>
                  <div className="text-center py-4">
                    <h3 className="font-medium text-gray-800 text-lg">
                      {product.name}
                    </h3>
                    <p className="font-semibold mt-1 text-lg">
                      {product.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button className="px-10 py-3 rounded w-52 bg-black hover:bg-gray-900 text-white">
                Explore more
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
