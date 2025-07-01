
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Interview Tips That Actually Work",
      excerpt: "Master the art of internship interviews with these proven strategies from industry recruiters.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      category: "Interview Prep",
      date: "Dec 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Build a Standout Resume",
      excerpt: "Learn what recruiters look for and how to make your resume shine in a competitive market.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
      category: "Career Tips",
      date: "Dec 12, 2024",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Future of Remote Internships",
      excerpt: "Explore how remote work is reshaping internship opportunities and what it means for students.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Industry Trends",
      date: "Dec 10, 2024",
      readTime: "6 min read"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-4xl font-bold text-gray-800">
              Learn & Grow
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay ahead with expert insights, career tips, and industry trends
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-gray-800 leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <Button variant="ghost" className="w-full text-blue-600 hover:bg-blue-50 group">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3">
            Visit Resource Hub
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
