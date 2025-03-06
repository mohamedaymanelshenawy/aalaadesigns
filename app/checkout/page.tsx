"use client";
import type React from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, Truck } from "lucide-react";

// Input component

import { useEffect, useState, type FormEvent } from "react";

import { useCart } from "../contexts/CartContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Card component
interface CardProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

const Card = ({ children, className, ...props }: CardProps) => (
  <div className={` shadow-lg rounded-xl ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full px-4 py-3 border-2 rounded focus:outline-none transition-colors duration-200 ${className}`}
    {...props}
  />
);

// Label component
const Label = ({
  children,
  htmlFor,
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

// RadioGroupItem component
const RadioGroupItem = ({
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input className="w-5 h-5 " id={id} type="radio" {...props} />
);

export default function ModernCheckoutPage() {
  const [step, setStep] = useState(1);
  const { cart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cart && cart.items && cart.items.length > 0) {
      const calculatedTotal = cart.items.reduce((sum, product) => {
        return sum + product.price * product.count;
      }, 0);

      setTotalPrice(calculatedTotal);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };

        delete newErrors[id];

        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToShipping = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    // All validation passed at this point
    alert(
      "Your order has been placed successfully! You will pay cash on delivery."
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 p-8">
          <motion.div
            key={step}
            animate="animate"
            exit="exit"
            initial="initial"
            transition={{ duration: 0.3 }}
            variants={fadeIn}
          >
            {step === 1 && (
              <form className="space-y-6" onSubmit={handleContinueToShipping}>
                <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      required
                      className={errors.firstName ? "border-red-500" : ""}
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      required
                      className={errors.lastName ? "border-red-500" : ""}
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    required
                    className={errors.email ? "border-red-500" : ""}
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    required
                    className={errors.phone ? "border-red-500" : ""}
                    id="phone"
                    placeholder="+20 (123) 456-7890"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    required
                    className={errors.address ? "border-red-500" : ""}
                    id="address"
                    placeholder="123 Main St, City, Egypt"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full mt-6 flex items-center justify-center"
                  type="submit"
                >
                  Continue to Shipping <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            )}
            {step === 2 && (
              <form className="space-y-6" onSubmit={handlePlaceOrder}>
                <div className="flex items-center mb-6">
                  <Button
                    aria-label="Go back to billing details"
                    className="mr-4 p-2"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <h2 className="text-2xl font-semibold">Shipping & Payment</h2>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Option</h3>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg transition-colors duration-200">
                    <RadioGroupItem
                      defaultChecked
                      required
                      id="standard"
                      name="shipping"
                      value="standard"
                    />
                    <Label
                      className="flex items-center space-x-3 cursor-pointer"
                      htmlFor="standard"
                    >
                      <Truck className="" size={24} />
                      <div>
                        <span className="font-medium">Standard Shipping</span>
                        <p className="text-sm text-gray-500">
                          Delivery within 5-7 business days
                        </p>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <svg
                        className="lucide lucide-banknote"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect height="12" rx="2" width="20" x="2" y="6" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M6 12h.01M18 12h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 flex items-center justify-center"
                  type="submit"
                >
                  Place Order <ArrowRight className="ml-2" size={18} />
                </Button>
              </form>
            )}
          </motion.div>
        </Card>
        <Card className="md:col-span-1 p-8 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          {!cart || !cart.items || cart.items.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item, index) => (
                <div key={index} className="flex flex-col py-3 border-b">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-medium">
                      {(item.price * item.count).toFixed(2)} EGP
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Qty: {item.count} × {item.price.toFixed(2)} EGP
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center py-2">
                <span>Subtotal</span>
                <span>{totalPrice.toFixed(2)} EGP</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span>Shipping</span>
                <span>30.00 EGP</span>
              </div>

              <div className="flex justify-between items-center font-semibold text-lg pt-4 border-t">
                <span>Total</span>
                <span>{(totalPrice + 30).toFixed(2)} EGP</span>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700">
              <AlertCircle size={20} />
              <span className="text-sm">
                Your order will be processed securely.
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
