
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Target, Users, BarChart3, Zap, Rocket } from "lucide-react";

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Target className="w-14 h-14 text-white" />,
      title: "Application Tracking",
      description: "Keep track of all your internship applications with our intuitive dashboard.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-14 h-14 text-white" />,
      title: "Smart Matchmaking",
      description: "AI-powered system matches you with companies that align with your goals.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-14 h-14 text-white" />,
      title: "Career Analytics",
      description: "Track your progress with detailed analytics and personalized recommendations.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-14 h-14 text-white" />,
      title: "Smart Recommendations",
      description: "Discover internships and companies with our recommendation engine.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-3 text-sm font-medium text-purple-700 mb-4">
          <Rocket className="w-4 h-4" />
          Powerful Features
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our comprehensive platform provides all the tools you need to land your dream internship.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className={`p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 rounded-xl group ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="mb-4 flex justify-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
