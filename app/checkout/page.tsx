"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { CreditCard, Truck, AlertCircle } from "lucide-react";
// Input component
import {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  HTMLAttributes,
} from "react";

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
    className={`w-full px-4 py-3 border-2  rounded focus:outline-none  transition-colors duration-200 ${className}`}
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

// RadioGroup component
const RadioGroup = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">Checkout</h1>
      <div className="grid md:grid-cols-5 gap-8">
        <Card className="md:col-span-3 p-8">
          <motion.div
            key={step}
            animate="animate"
            exit="exit"
            initial="initial"
            transition={{ duration: 0.3 }}
            variants={fadeIn}
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input required id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input required id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    required
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    required
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    required
                    id="address"
                    placeholder="123 Main St, City, Country"
                  />
                </div>
                <Button className="w-full mt-6" onClick={() => setStep(2)}>
                  Continue to Shipping
                </Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Shipping</h2>
                <RadioGroup>
                  <div className="flex items-center space-x-3 p-4 border-2  rounded-lg  transition-colors duration-200">
                    <RadioGroupItem
                      id="standard"
                      name="shipping"
                      value="standard"
                    />
                    <Label
                      className="flex items-center space-x-3 cursor-pointer"
                      htmlFor="standard"
                    >
                      <Truck className="" size={24} />
                      <span>Standard Shipping (3-5 business days)</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2   duration-200">
                    <RadioGroupItem
                      id="express"
                      name="shipping"
                      value="express"
                    />
                    <Label
                      className="flex items-center space-x-3 cursor-pointer"
                      htmlFor="express"
                    >
                      <Truck size={24} />
                      <span>Express Shipping (1-2 business days)</span>
                    </Label>
                  </div>
                </RadioGroup>
                <Button className="w-full mt-6" onClick={() => setStep(3)}>
                  Continue to Payment
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">Payment</h2>
                <RadioGroup>
                  <div className="flex items-center space-x-3 p-4 border-2  rounded-lg  transition-colors duration-200">
                    <RadioGroupItem id="card" name="payment" value="card" />
                    <Label
                      className="flex items-center space-x-3 cursor-pointer"
                      htmlFor="card"
                    >
                      <CreditCard size={24} />
                      <span>Credit Card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2  rounded-lg mt-4  transition-colors duration-200">
                    <RadioGroupItem id="paypal" name="payment" value="paypal" />
                    <Label
                      className="flex items-center space-x-3 cursor-pointer"
                      htmlFor="paypal"
                    >
                      <img
                        alt="PayPal"
                        className="h-6 w-6"
                        src="/placeholder.svg?height=24&width=24"
                      />
                      <span>PayPal</span>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="space-y-2 mt-6">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    required
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input required id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input required id="cvv" placeholder="123" />
                  </div>
                </div>
                <Button className="w-full mt-6">Place Order</Button>
              </div>
            )}
          </motion.div>
        </Card>
        <Card className="md:col-span-2 p-8">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Basic cotton t-shirt</span>
              <span>$50.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg pt-4 border-t">
              <span>Total</span>
              <span>$55.00</span>
            </div>
          </div>
          <div className="mt-8 p-4  rounded-lg">
            <div className="flex items-center space-x-2 ">
              <AlertCircle size={24} />
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
