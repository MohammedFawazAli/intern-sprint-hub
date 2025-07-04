
import { useState, useEffect } from "react";
import { Users, Briefcase, TrendingUp } from "lucide-react";

const MetricsSection = () => {
  const [currentMetric, setCurrentMetric] = useState(0);

  useEffect(() => {
    // Animate metrics
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
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
            const isActive = currentMetric === index;
            return (
              <div 
                key={index}
                className={`text-center transition-all duration-500 transform ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                <div className={`flex items-center justify-center mb-4 transition-all duration-300 ${
                  isActive ? 'animate-pulse' : ''
                }`}>
                  <div className={`w-12 h-12 bg-gradient-to-br from-${metric.color.split('-')[1]}-100 to-${metric.color.split('-')[1]}-200 rounded-full flex items-center justify-center mr-3`}>
                    <IconComponent className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`text-4xl font-bold ${metric.color} transition-all duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`}>
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
