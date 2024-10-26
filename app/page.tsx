/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Button } from "@nextui-org/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Gorditas } from "next/font/google";
import { useTheme } from "next-themes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import NewArraivalCard from "@/components/NewArraivalCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useUser } from "@/app/contexts/UserContext";
import "../styles/globals.css";
import CategoryCard from "@/components/CategoryCard";

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
    <div>
      <Card className="w-full mx-auto overflow-hidden relative">
        <div className="relative aspect-[16/7]">
          <img
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/landing.png"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
            <h2
              className={`${gorditas.className} text-3xl sm:text-4xl md:text-5xl lg:text-7xl opacity-[0.7] font-bold text-center max-w-6xl mx-auto`}
            >
              Discover The New Trending Summer Collection
            </h2>
            <div className="w-full flex justify-center">
              <Button
                as={Link}
                className="bg-black text-white hover:bg-gray-900 hover:opacity-60 transition-colors group px-4 sm:px-6 py-2 sm:py-3"
                href="/products"
              >
                Shop Now
                <span className="ml-2 bg-white rounded-full p-1 inline-flex items-center justify-center">
                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-black transition-transform group-hover:scale-[1.15]" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-10 w-full flex justify-center">
        <div
          className={`h-[1px] ${
            currentTheme === "dark" ? "bg-white" : "bg-black"
          } w-4/5`}
        />
      </div>
      <section className="py-8 px-4">
        <div className="max-w-[90rem] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mx-3">
            Categories
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Mix & Match to level up your fashion game
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {fetchedCategories.map((category, index) => {
              const isLarge = index % 4 === 1 || index % 4 === 2;

              return (
                <CategoryCard
                  key={index}
                  //className={`${
                  //  isLarge ? "sm:col-span-2" : ""
                  //} ${index % 4 === 0 || index % 4 === 3 ? "aspect-[3/4]" : "aspect-[3/2]"}`}
                  id={index}
                  isLarge={isLarge}
                  name={category.name}
                />
              );
            })}
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
        <div className="max-w-[91rem] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold m-3">
            New Arrivals{" "}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">
            Take a look at our newest items
          </p>
          <div className="container mx-auto px-4 py-8 relative">
            <Swiper
              breakpoints={{
                410: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              spaceBetween={20}
            >
              {newArrivals.map((item, index) => (
                <SwiperSlide key={index}>
                  <NewArraivalCard
                    description={item.description}
                    name={item.name}
                    path={item.path}
                    price={item.price}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
