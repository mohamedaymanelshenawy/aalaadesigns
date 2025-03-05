"use client";
import { useState } from "react";
import { Card, CardBody, Input, Button } from "@heroui/react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row">
            {/* Contact Form Section */}
            <div className="flex-1 flex flex-col p-4 rounded-lg">
              <h1 className="text-3xl font-semibold text-center mb-7">
                Contact Us
              </h1>
              {formStatus && (
                <p className="text-center text-green-600 mb-4">{formStatus}</p>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="Name"
                  name="name"
                  size="lg"
                  value={formData.name}
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <Input
                  isRequired
                  className="rounded"
                  label="Email"
                  name="email"
                  size="lg"
                  type="email"
                  value={formData.email}
                  variant="bordered"
                  onChange={handleInputChange}
                />
                <textarea
                  required
                  className="border border-gray-300 rounded-xl p-2 w-full"
                  name="message"
                  placeholder="Enter your message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <Button
                  className="w-full bg-black text-white rounded"
                  size="lg"
                  type="submit"
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUs;
