
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Clock, Search } from "lucide-react";

const InternshipPreview = () => {
  const featuredInternships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Remote",
      duration: "3 months",
      tags: ["React", "Node.js", "MongoDB"],
      logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Marketing Intern",
      company: "GrowthLab",
      location: "New York, NY",
      type: "Hybrid",
      duration: "6 months",
      tags: ["Digital Marketing", "Analytics", "Content"],
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "DataWorks",
      location: "Austin, TX",
      type: "On-site",
      duration: "4 months",
      tags: ["Python", "Machine Learning", "SQL"],
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
    }
  ];

  return (
    <section id="internships" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Internship
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Browse through hundreds of internship opportunities from top companies worldwide.
          </p>
          
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by role, company, or skills..."
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Location</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="sf">San Francisco</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Field</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Internships Grid - Limited to 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {featuredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={internship.logo}
                      alt={`${internship.company} logo`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-xl text-gray-800 mb-1">
                        {internship.title}
                      </CardTitle>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{internship.company}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {internship.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{internship.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {internship.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
            View All Internships
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InternshipPreview;
