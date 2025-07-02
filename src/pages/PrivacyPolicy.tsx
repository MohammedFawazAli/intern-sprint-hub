
import { Card, CardContent } from "@/components/ui/card";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import EnhancedFooter from "@/components/EnhancedFooter";
import Breadcrumb from "@/components/Breadcrumb";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavigation />
      <Breadcrumb />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-700 mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    apply for internships, or contact us for support.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Personal information (name, email, phone number)</li>
                    <li>Profile information (education, skills, experience)</li>
                    <li>Resume and portfolio materials</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We use the information we collect to provide, maintain, and improve our services.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Match you with relevant internship opportunities</li>
                    <li>Communicate with you about your applications</li>
                    <li>Provide customer support</li>
                    <li>Send you updates and promotional materials (with your consent)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                  <p className="text-gray-700 mb-4">
                    We implement appropriate security measures to protect your personal information 
                    against unauthorized access, disclosure, or destruction.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                  <p className="text-gray-700 mb-4">
                    You have the right to access, update, or delete your personal information at any time.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      Email: privacy@internsprint.com<br />
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

export default PrivacyPolicy;
