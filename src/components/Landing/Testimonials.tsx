import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Rider",
      location: "New York",
      rating: 5,
      content: "Nirapod Ride has completely transformed my daily commute. The drivers are always professional and the app is so easy to use. I feel safe and comfortable every time I ride.",
      avatar: "SJ",
      type: "rider"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Driver Partner",
      location: "San Francisco",
      rating: 5,
      content: "As a driver, I love the flexibility and earning potential. The app makes it easy to manage my schedule, and the support team is always helpful when I need assistance.",
      avatar: "MC",
      type: "driver"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Business Professional",
      location: "Chicago",
      rating: 5,
      content: "I use Nirapod Ride for all my business trips. The reliability and punctuality are unmatched. The premium ride option is perfect for client meetings.",
      avatar: "ER",
      type: "rider"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Full-time Driver",
      location: "Miami",
      rating: 5,
      content: "The earning opportunities here are fantastic. The surge pricing during peak hours and bonus programs have helped me achieve my financial goals faster than I expected.",
      avatar: "DT",
      type: "driver"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Student",
      location: "Boston",
      rating: 5,
      content: "As a student, affordability is key. Nirapod Ride offers great prices without compromising on safety or quality. The ride-sharing feature has saved me so much money!",
      avatar: "LW",
      type: "rider"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "App Store Rating" },
    { number: "50K+", label: "5-Star Reviews" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "2min", label: "Avg. Response Time" }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied riders and drivers who trust Nirapod Ride for their daily transportation needs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="absolute top-6 right-6 text-primary/20">
              <Quote className="h-16 w-16" />
            </div>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                  
                  <blockquote className="text-lg sm:text-xl text-foreground mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentTestimonial
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Content */}
                <blockquote className="text-foreground mb-4 text-sm leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Type Badge */}
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-3 ${
                  testimonial.type === 'rider' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {testimonial.type === 'rider' ? 'Rider' : 'Driver'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Them?</h3>
            <p className="text-muted-foreground mb-6">
              Start your journey with Nirapod Ride today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Download App
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors">
                Become a Driver
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;