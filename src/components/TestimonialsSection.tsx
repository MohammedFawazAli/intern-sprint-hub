
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Software Engineering Intern at Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "InternSprint helped me land my dream internship at Google. The application tracking feature kept me organized, and the company insights were invaluable during interviews.",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Marketing Intern at Spotify",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The personalized recommendations feature introduced me to companies I never would have discovered on my own. Now I'm working at my favorite music streaming platform!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Data Science Intern at Netflix",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The career growth analytics showed me exactly what skills I needed to develop. InternSprint didn't just help me find an internship - it helped me build my career.",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "UX Design Intern at Airbnb",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The interview preparation resources and company culture insights gave me the confidence I needed. I felt prepared for every step of the process.",
      rating: 5
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Finance Intern at Goldman Sachs",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      quote: "InternSprint's smart matching algorithm connected me with opportunities that perfectly aligned with my goals. The platform truly understands what students need.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Onboarded" },
    { number: "12,000+", label: "Internships Placed" },
    { number: "2,500+", label: "Partner Companies" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students who transformed their careers with InternSprint
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-blue-500 mb-4" />
                      </div>
                      
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
