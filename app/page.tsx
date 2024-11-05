"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Gorditas } from "next/font/google";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";

import NewArraivalCard from "@/components/NewArraivalCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useUser } from "@/app/contexts/UserContext";
import "../styles/globals.css";
import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
  description: string;
}

const gorditas = Gorditas({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const newArrivals = [
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival1.png",
    price: "500",
  },
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival2.png",
    price: "500",
  },
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival3.png",
    price: "500",
  },
  {
    name: "Dress",
    description: "Beautiful Dress",
    path: "/arrival4.png",
    price: "500",
  },
];

export default function Home() {
  const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
  const [, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { setUser } = useUser();
  const { theme, systemTheme } = useTheme();

  async function fetchCategories() {
    try {
      const response = await fetch(`/api/products/categories`);
      const data = await response.json();

      setFetchedCategories(data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    fetchCategories();
  }, [setUser]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="w-full h-[40vh] bg-gray-300 dark:bg-gray-700 mb-10" />

      {/* Divider Skeleton */}
      <div className="w-4/5 h-[1px] bg-gray-300 dark:bg-gray-700 mx-auto mb-10" />

      {/* Categories Section Skeleton */}
      <div className="max-w-[90rem] mx-auto text-center mb-10">
        <div className="h-10 w-1/3 bg-gray-300 dark:bg-gray-700 mx-auto mb-4" />
        <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <div className="aspect-[3/4] bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="aspect-[3/2] bg-gray-300 dark:bg-gray-700 rounded-lg sm:col-span-2" />
          <div className="aspect-[3/2] bg-gray-300 dark:bg-gray-700 rounded-lg sm:col-span-2" />
          <div className="aspect-[3/4] bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      {/* Divider Skeleton */}
      <div className="w-4/5 h-[1px] bg-gray-300 dark:bg-gray-700 mx-auto mb-10" />

      {/* New Arrivals Section Skeleton */}
      <div className="max-w-[91rem] mx-auto text-center">
        <div className="h-10 w-1/3 bg-gray-300 dark:bg-gray-700 mx-auto mb-4" />
        <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 mx-auto mb-8" />
        <div className="flex justify-center space-x-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-64 h-80 bg-gray-300 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-[16/6]"
        role="button"
        tabIndex={0}
        onClick={() => router.push("/products")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push("/products");
          }
        }}
      >
        <Image
          priority
          alt="Summer Collection"
          className="object-cover object-center"
          layout="fill"
          src="/landing.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 flex flex-col justify-between text-white">
          <h2
            className={`${gorditas.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl opacity-[0.7] font-bold text-center max-w-6xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20`}
          >
            Discover The New Trending Summer Collection
          </h2>
          <div className="w-full flex justify-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <Button
              asChild
              className="text-lg sm:text-xl rounded-full md:text-2xl lg:text-3xl bg-black text-white hover:bg-gray-900 transition-colors group w-40 sm:w-48 md:w-56 lg:w-60 h-12 sm:h-14 md:h-16"
            >
              <Link href="/products">
                Shop Now
                <span className="ml-2 bg-white rounded-full p-1 inline-flex items-center justify-center">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-black transition-transform group-hover:scale-[1.15]" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full flex justify-center">
        <div
          className={`h-[1px] ${
            currentTheme === "dark" ? "bg-white" : "bg-black"
          } w-4/5`}
        />
      </div>

      <section className="py-8 px-4">
        <div className="mx-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mx-3">
            Categories
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Mix & Match to level up your fashion game
          </p>
          <div className="flex flex-wrap justify-center  mx-auto">
            {fetchedCategories.map((category) => (
              <div
                key={category.id}
                className="flex-1 min-w-[30%] transition-all duration-300 ease-in-out hover:flex-[6]"
              >
                <CategoryCard id={category.id} name={category.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex justify-center">
        <div
          className={`h-[1px] ${
            currentTheme === "dark" ? "bg-white" : "bg-black"
          } w-4/5`}
        />
      </div>

      <section className="py-12 px-4">
        <div className=" mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold m-3">
            New Arrivals
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Take a look at our newest items
          </p>
          <div className="container mx-auto px-4 py-8 relative flex flex-wrap justify-center">
            {newArrivals.map((item, index) => (
              <NewArraivalCard
                key={index}
                description={item.description}
                name={item.name}
                path={item.path}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
