import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-serif text-white font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the services.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Description of Services</h2>
          <p>
            Collectly provides automated payment follow-up and invoicing tools for freelancers and agencies. We facilitate communication with your clients regarding overdue payments based on the schedules you configure.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Collectly and its licensors.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            In no event shall Collectly, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at terms@collectly.com.
          </p>
        </div>
      </div>
    </div>
  );
}
