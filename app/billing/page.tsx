/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

import { Cart } from "../types/types";

import { useUser } from "@/app/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  email: z.string().email("Invalid email address"),
  emergency: z.string().optional(),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
});

export default function BillingDetailsPage() {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      emergency: "",
      notes: "",
      couponCode: "",
    },
  });
  const handleCheckout = async () => {
    setIsPlacingOrder(true);
    setIsLoading(true);
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      userId: user?.id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch("/api/order", requestOptions);
      const result = await response.json();

      setOrderPlaced(true);
      setCart(null); // Clear the cart
      setTimeout(() => {
        setOrderPlaced(false);
        setIsPlacingOrder(false);
      }, 3000);
    } catch (error) {
      setError("Failed to place order");
      setIsPlacingOrder(false);
    }
    setIsLoading(false);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }
  //if (isLoading) {
  //  return (
  //    <div className="flex flex-col items-center justify-center min-h-screen">
  //      <Loader2 className="w-16 h-16 text-black animate-spin" />
  //      <p className="mt-4 text-xl font-semibold text-gray-800 animate-pulse">
  //        Loading your cart...
  //      </p>
  //    </div>
  //  );
  //}

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-yellow-500">
        <AlertCircle className="w-16 h-16 text-white" />
        <p className="mt-4 text-xl font-semibold text-white">Oops! {error}</p>
        <Button
          className="mt-4 bg-white text-red-500 hover:bg-red-100"
          onClick={handleCheckout}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">CHECKOUT</h1>
      <Separator className="mb-8 bg-gray-200" />
      <AnimatePresence>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6">
                    BILLING DETAILS
                  </h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={methods.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-normal">
                              FIRST NAME *
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-300" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={methods.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-normal">
                              LAST NAME *
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-300" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={methods.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-normal">
                            PHONE *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-gray-300"
                              type="tel"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-normal">
                            ADDRESS *
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-normal">
                            E-MAIL *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-gray-300"
                              type="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="emergency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-normal">
                            WHAT&apos;S APP NUMBER (FOR EMERGENCY CONNECTION)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-gray-300"
                              type="tel"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={methods.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-normal">
                            ORDER NOTES
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="border-gray-300"
                              placeholder="Notes about your order, e.g. special notes for delivery."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">COUPON CODE</h2>
                    <Button
                      className="text-2xl font-bold p-0"
                      size="sm"
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowCouponInput(!showCouponInput);
                        if (!showCouponInput) {
                          methods.setError("couponCode", {
                            type: "manual",
                            message: "Invalid coupon code",
                          });
                        }
                      }}
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>
                  {showCouponInput && (
                    <FormField
                      control={methods.control}
                      name="couponCode"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormControl>
                            <Input
                              {...field}
                              className="border-gray-300"
                              placeholder="Enter coupon code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <div className="space-y-4 bg-gray-50 p-4 sm:p-6">
                    <div className="flex justify-between">
                      <span className="font-semibold">YOUR ORDER</span>
                      <span className="font-semibold">$50 EUR</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Taxes calculated at checkout
                    </div>
                    <Separator className="bg-gray-300" />
                    <div className="flex justify-between">
                      <span className="font-semibold">SUBTOTAL</span>
                      <span className="font-semibold">$50 EUR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>SHIPPING</span>
                      <span>Flat rate</span>
                    </div>
                    <Separator className="bg-gray-300" />
                    <div className="text-sm">
                      PAYMENT METHOD:
                      <div className="flex items-center mt-2 space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Cash on delivery</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        alt="Mastercard"
                        className="h-8"
                        src="/placeholder.svg?height=30&width=50"
                      />
                      <img
                        alt="Visa"
                        className="h-8"
                        src="/placeholder.svg?height=30&width=50"
                      />
                    </div>
                    <div className="text-xs text-gray-600">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </div>
                    <Button
                      className="w-full relative"
                      disabled={isPlacingOrder}
                      onClick={handleCheckout}
                    >
                      {isPlacingOrder ? (
                        <motion.div
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                        >
                          <Loader2 className="w-6 h-6 animate-spin" />
                        </motion.div>
                      ) : orderPlaced ? (
                        <motion.div
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                          exit={{ opacity: 0, scale: 0.5 }}
                          initial={{ opacity: 0, scale: 0.5 }}
                        >
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : null}
                      <span
                        className={
                          isPlacingOrder || orderPlaced ? "invisible" : ""
                        }
                      >
                        Place order
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
