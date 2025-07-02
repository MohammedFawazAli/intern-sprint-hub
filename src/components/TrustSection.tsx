
import { CheckCircle, Award, Users, TrendingUp, Shield, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TrustSection = () => {
  const partnerLogos = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", width: "w-24" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", width: "w-28" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", width: "w-8" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", width: "w-24" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", width: "w-20" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", width: "w-24" }
  ];

  const trustMetrics = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      metric: "50,000+",
      label: "Students Placed",
      description: "Successfully matched with internships"
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      metric: "2,500+",
      label: "Partner Companies",
      description: "Top-tier organizations hiring through us"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      metric: "95%",
      label: "Success Rate",
      description: "Students who complete programs get offers"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      metric: "100%",
      label: "Verified Companies",
      description: "All partners undergo strict verification"
    }
  ];

  const featuredIn = [
    { publication: "TechCrunch", logo: "https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png" },
    { publication: "Forbes", logo: "https://www.forbes.com/favicon.ico" },
    { publication: "Wired", logo: "https://www.wired.com/favicon.ico" },
    { publication: "Bloomberg", logo: "https://www.bloomberg.com/favicon.ico" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Trust Metrics */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Students & Companies Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Our platform has become the go-to destination for internship opportunities, 
            connecting ambitious students with industry-leading companies.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustMetrics.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{item.metric}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Companies */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Leading Companies</h3>
            <p className="text-gray-600">Join thousands of students who've landed internships at top organizations</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 hover:opacity-100 transition-opacity">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={`${partner.width} h-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Every company on our platform is verified and vetted. We ensure all internship opportunities 
              are legitimate, paid positions with clear learning objectives and mentorship support.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Verified Companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Quality Assurance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Legitimate Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured In */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">As Featured In</h3>
          <div className="flex items-center justify-center gap-8 opacity-60">
            {featuredIn.map((media, index) => (
              <div key={index} className="flex items-center justify-center h-8">
                <span className="text-gray-600 font-medium">{media.publication}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
