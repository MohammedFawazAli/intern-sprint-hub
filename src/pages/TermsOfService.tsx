
import { Card, CardContent } from "@/components/ui/card";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import Breadcrumb from "@/components/Breadcrumb";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavigation />
      <Breadcrumb />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 mb-4">
                    By accessing and using InternSprint, you accept and agree to be bound by the terms 
                    and provision of this agreement.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                  <p className="text-gray-700 mb-4">
                    Permission is granted to temporarily use InternSprint for personal, non-commercial use only.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>This is the grant of a license, not a transfer of title</li>
                    <li>You may not modify or copy the materials</li>
                    <li>You may not use the materials for commercial purposes</li>
                    <li>You may not reverse engineer any software contained on the website</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                  <p className="text-gray-700 mb-4">
                    When you create an account with us, you must provide accurate and complete information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Uses</h2>
                  <p className="text-gray-700 mb-4">
                    You may not use our service:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>For any unlawful purpose or to solicit others to act unlawfully</li>
                    <li>To violate any international, federal, provincial, or state regulations or laws</li>
                    <li>To transmit or procure the sending of any advertising or promotional material</li>
                    <li>To impersonate or attempt to impersonate another user</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer</h2>
                  <p className="text-gray-700 mb-4">
                    The materials on InternSprint are provided on an 'as is' basis. InternSprint makes 
                    no warranties, expressed or implied, and hereby disclaims all other warranties.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
                  <p className="text-gray-700 mb-4">
                    Questions about the Terms of Service should be sent to us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Email: legal@internsprint.com<br />
                      Phone: +1 (555) 123-4567<br />
                      Address: San Francisco, CA
                    </p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <EnhancedFooter />
    </div>
  );
};

export default TermsOfService;
