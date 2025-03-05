"use client";

import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Button,
  Input,
} from "@heroui/react";
import { ChevronDown, Search, Mail } from "lucide-react";

const faqs = [
  {
    question: "What is AALAA Designs?",
    answer:
      "AALAA Designs is a cutting-edge fashion brand specializing in modern, modest clothing for women. We offer a curated collection of stylish and comfortable garments that seamlessly blend contemporary trends with timeless elegance, catering to diverse tastes and occasions.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Placing an order with AALAA Designs is effortless. Simply browse our extensive collection on our user-friendly website, select your desired items, add them to your cart, and proceed to our secure checkout. Follow the intuitive prompts to complete your purchase, and get ready to elevate your wardrobe.",
  },
  {
    question: "What are your shipping options?",
    answer:
      "We provide flexible shipping options to suit your needs. Our standard shipping typically delivers within 5-7 business days, perfect for those who can wait to unveil their new fashion finds. For those eager to refresh their wardrobe, our express shipping ensures your items arrive within 2-3 business days. Shipping costs and delivery times may vary based on your location, but we strive to offer the most efficient service possible.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Your satisfaction is our priority. We offer a generous 30-day return policy for most items. If you're not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. We simply ask that items are unworn, unwashed, and in their original packaging to ensure a smooth return process.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "AALAA Designs is proud to cater to fashion enthusiasts worldwide. We ship to numerous countries across the globe. During the checkout process, you can easily select your country to view available shipping options and associated costs. Please note that international orders may be subject to customs fees or import duties as per your country's regulations.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Tracking your AALAA Designs order is simple and convenient. Once your order is shipped, we'll promptly send you a confirmation email containing a unique tracking number. You can use this number to monitor your package's journey in real-time, either through our website's order tracking feature or directly on the carrier's website. Stay excited and informed about your fashion delivery every step of the way!",
  },
];

export default function ModernFAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(lowerCaseQuery) ||
        faq.answer.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>

        <div className="mb-12">
          <div className="relative">
            <Input
              aria-label="Search FAQs"
              className="w-full max-w-2xl mx-auto rounded"
              placeholder="Search FAQs..."
              size="lg"
              startContent={<Search className="" />}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="w-full shadow-xl bg-transparent">
          <CardBody className="p-0">
            {filteredFaqs.length > 0 ? (
              <Accordion className="p-2" variant="splitted">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={faq.question}
                    classNames={{
                      base: "py-4",
                      title: "text-xl font-semibold ",
                      content: "text-lg  pt-2",
                    }}
                    indicator={<ChevronDown className="text-2xl" />}
                    title={faq.question}
                  >
                    {faq.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="p-8 text-center ">
                <p className="text-xl">
                  No matching FAQs found. Please try a different search term.
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        <div className="mt-16 text-center  p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold mb-4 ">Still have questions?</h2>
          <p className="text-xl  mb-6">
            Our customer support team is here to help you with any inquiries.
          </p>
          <Button
            className="text-lg"
            color="primary"
            endContent={<Mail className="ml-2" />}
            size="lg"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
