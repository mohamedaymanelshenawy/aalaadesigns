import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Your Website</title>
        <meta name="description" content="Read our privacy policy to understand how we handle your data." />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Privacy Policy</h1>

          <p className="text-gray-600 mb-4">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data.
          </p>

          <h2 className="text-lg font-semibold mt-4">1. Data We Collect</h2>
          <p className="text-gray-600">
            - Personal Information (name, email, etc.)  
            - Usage Data (IP address, browser type, device info)  
            - Cookies & Tracking Technologies  
          </p>

          <h2 className="text-lg font-semibold mt-4">2. How We Use Your Data</h2>
          <p className="text-gray-600">
            - To provide and improve our services  
            - To personalize user experience  
            - To comply with legal obligations  
          </p>

          <h2 className="text-lg font-semibold mt-4">3. Cookies & Tracking</h2>
          <p className="text-gray-600">
            We use cookies to enhance functionality and analyze site traffic. You can manage cookie preferences in your browser settings.
          </p>

          <h2 className="text-lg font-semibold mt-4">4. Third-Party Services</h2>
          <p className="text-gray-600">
            We may share data with trusted third-party services (e.g., Stripe, Google Analytics) for payment processing and analytics.
          </p>

          <h2 className="text-lg font-semibold mt-4">5. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal data. Contact us for any privacy-related requests.
          </p>

          <h2 className="text-lg font-semibold mt-4">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this policy, please contact us at <strong>AalaaElshenawy@email.com</strong>.
          </p>

          <p className="text-gray-500 text-sm text-center mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
}
