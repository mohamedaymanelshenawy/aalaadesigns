import Head from "next/head";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Aalaa</title>
        <meta
          content="Read our privacy policy to understand how we handle your data."
          name="description"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 sm:px-6">
          <div className="mb-10">
            <Link
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              href="/"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-10 sm:px-10">
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
              <p className="mt-2 text-gray-300 max-w-2xl">
                Your privacy is important to us. This document outlines how we
                collect, use, and protect your personal information.
              </p>
            </div>

            <div className="px-6 py-8 sm:px-10">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  At Aalaa, we take your privacy seriously. This Privacy Policy
                  explains how we collect, use, and protect your personal data
                  when you use our services.
                </p>

                <div className="my-8 space-y-8">
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                        1
                      </span>
                      Data We Collect
                    </h2>
                    <div className="mt-4 pl-11 space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>
                          Personal Information (name, email address, contact
                          details)
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>
                          Usage Data (IP address, browser type, device
                          information)
                        </span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>Cookies & Tracking Technologies</span>
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                        2
                      </span>
                      How We Use Your Data
                    </h2>
                    <div className="mt-4 pl-11 space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To provide and improve our services</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To personalize your user experience</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>To comply with legal obligations</span>
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                        3
                      </span>
                      Cookies & Tracking
                    </h2>
                    <div className="mt-4 pl-11 text-gray-600">
                      <p className="leading-relaxed">
                        We use cookies to enhance functionality and analyze site
                        traffic. You can manage cookie preferences in your
                        browser settings.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                        4
                      </span>
                      Third-Party Services
                    </h2>
                    <div className="mt-4 pl-11 text-gray-600">
                      <p className="leading-relaxed">
                        We may share data with trusted third-party services
                        (e.g., Stripe, Google Analytics) for payment processing
                        and analytics.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                        5
                      </span>
                      Your Rights
                    </h2>
                    <div className="mt-4 pl-11 text-gray-600">
                      <p className="leading-relaxed">
                        You have the right to access, update, or delete your
                        personal data. Contact us for any privacy-related
                        requests.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 mr-3 text-sm">
                        6
                      </span>
                      Contact Us
                    </h2>
                    <div className="mt-4 pl-11 text-gray-600">
                      <p className="leading-relaxed">
                        If you have questions about this policy, please contact
                        us at{" "}
                        <a
                          className="text-gray-900 font-medium hover:underline"
                          href="mailto:AalaaElshenawy@email.com"
                        >
                          AalaaElshenawy@email.com
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm text-center">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
