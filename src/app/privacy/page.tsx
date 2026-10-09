import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-serif text-white font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>
            Collectly ("we," "our," or "us") collects information that you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We may use the information we collect about you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Provide, maintain, and improve our Services;</li>
            <li>Perform internal operations, including to prevent fraud and abuse of our Services;</li>
            <li>Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of Collectly;</li>
            <li>Personalize and improve the Services.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@collectly.com.
          </p>
        </div>
      </div>
    </div>
  );
}
