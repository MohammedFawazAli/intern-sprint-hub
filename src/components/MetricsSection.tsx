
import { useState, useEffect } from "react";
import { Users, Briefcase, TrendingUp } from "lucide-react";

const MetricsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple visibility trigger instead of cycling animation
    setIsVisible(true);
  }, []);

  const metrics = [
    { icon: Users, value: "50,000+", label: "Students Placed", color: "text-blue-600" },
    { icon: Briefcase, value: "2,500+", label: "Partner Companies", color: "text-green-600" },
    { icon: TrendingUp, value: "95%", label: "Success Rate", color: "text-purple-600" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={index}
                className={`text-center transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${metric.color.split('-')[1]}-100 to-${metric.color.split('-')[1]}-200 rounded-full flex items-center justify-center mr-3`}>
                    <IconComponent className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`text-4xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
                <div className="text-gray-600 font-medium">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
