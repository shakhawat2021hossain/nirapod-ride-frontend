import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, ChevronUp, Users, Car, HelpCircle } from 'lucide-react';

import { Button } from "@/components/ui/button";

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState<number[]>([]);
    const [activeCategory, setActiveCategory] = useState<'all' | 'rider' | 'driver' | 'general'>('all');

    const faqItems = [
        {
            id: 1,
            question: "How do I book a ride?",
            answer: "Simply download our app, create an account, enter your destination, and confirm your ride. You'll be matched with a nearby driver instantly. You can also schedule rides in advance for future trips.",
            category: "rider"
        },
        {
            id: 2,
            question: "What are the requirements to become a driver?",
            answer: "To become a driver, you need: a valid driver's license, vehicle insurance, a clean driving record, and a vehicle that meets our safety standards (less than 10 years old, 4 doors, good condition). The application process typically takes 2-3 business days.",
            category: "driver"
        },
        {
            id: 3,
            question: "How are fares calculated?",
            answer: "Fares are based on several factors: base fare + distance + time + demand multiplier. You'll always see the estimated fare before confirming your ride. During high-demand periods, surge pricing may apply to ensure driver availability.",
            category: "rider"
        },
        {
            id: 4,
            question: "What safety measures are in place?",
            answer: "We have multiple safety features: 24/7 support team, real-time ride tracking, emergency assistance button, driver background checks, vehicle inspections, and ride sharing with trusted contacts. All rides are insured and monitored.",
            category: "rider"
        },
        {
            id: 5,
            question: "How do I contact customer support?",
            answer: "You can contact our 24/7 support team through: 1) In-app support chat, 2) Phone: +1 (555) 123-4567, 3) Email: support@nirapodride.com. Average response time is under 5 minutes for urgent matters.",
            category: "general"
        },
        {
            id: 6,
            question: "What payment methods are accepted?",
            answer: "We accept: credit/debit cards (Visa, MasterCard, American Express), mobile wallets (Apple Pay, Google Pay), and cash in select cities. All digital payments are securely processed and encrypted.",
            category: "rider"
        },
        {
            id: 7,
            question: "How much can I earn as a driver?",
            answer: "Earnings vary based on location, hours, and demand. Our top drivers earn $25-35 per hour during peak times. We offer bonus programs, quests, and referral incentives to maximize your earnings potential.",
            category: "driver"
        },
        {
            id: 8,
            question: "What's your cancellation policy?",
            answer: "Riders can cancel free within 2 minutes of booking. After 2 minutes, a cancellation fee may apply. Drivers can cancel occasionally without penalty, but repeated cancellations may affect their ratings and access to premium features.",
            category: "general"
        },
        {
            id: 9,
            question: "What should I do if I left an item in a vehicle?",
            answer: "Contact the driver directly through the app using the 'Lost Item' feature. If you're unable to reach the driver, contact our support team immediately with your trip details and item description.",
            category: "rider"
        },
        {
            id: 10,
            question: "How are driver ratings calculated?",
            answer: "Driver ratings are based on passenger reviews (1-5 stars) considering factors like driving safety, vehicle cleanliness, punctuality, and communication. Consistently high ratings unlock premium features and better ride matching.",
            category: "driver"
        },
        {
            id: 11,
            question: "Is there a minimum withdrawal amount for drivers?",
            answer: "Yes, the minimum withdrawal amount is $25. Drivers can withdraw earnings instantly to their bank account or debit card for a small fee, or choose free standard processing which takes 1-3 business days.",
            category: "driver"
        }
    ];

    const categories = [
        { id: 'all' as const, label: 'All Questions', icon: HelpCircle, count: faqItems.length },
        { id: 'rider' as const, label: 'Rider Questions', icon: Users, count: faqItems.filter(item => item.category === 'rider').length },
        { id: 'driver' as const, label: 'Driver Questions', icon: Car, count: faqItems.filter(item => item.category === 'driver').length },
        { id: 'general' as const, label: 'General', icon: HelpCircle, count: faqItems.filter(item => item.category === 'general').length }
    ];

    const toggleItem = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const filteredFaqs = faqItems.filter(item =>
        (activeCategory === 'all' || item.category === activeCategory) &&
        (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Find quick answers to common questions about our platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Search Bar */}
                        <div className="mb-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search FAQs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 text-lg py-6"
                                />
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2 mb-8 justify-center">
                            {categories.map((category) => {
                                const IconComponent = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${activeCategory === category.id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            }`}
                                    >
                                        <IconComponent className="h-4 w-4" />
                                        {category.label}
                                        <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                                            {category.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* FAQ Items */}
                        <div className="space-y-4">
                            {filteredFaqs.map((faq) => (
                                <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader
                                        className="cursor-pointer pb-4"
                                        onClick={() => toggleItem(faq.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg flex items-center gap-3">
                                                <span className={`inline-block w-2 h-2 rounded-full ${faq.category === 'rider' ? 'bg-blue-500' :
                                                        faq.category === 'driver' ? 'bg-green-500' :
                                                            'bg-purple-500'
                                                    }`}></span>
                                                {faq.question}
                                            </CardTitle>
                                            {openItems.includes(faq.id) ? (
                                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardHeader>
                                    {openItems.includes(faq.id) && (
                                        <CardContent className="pt-0 border-t">
                                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                        </CardContent>
                                    )}
                                </Card>
                            ))}

                            {filteredFaqs.length === 0 && (
                                <Card>
                                    <CardContent className="py-12 text-center">
                                        <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                                        <p className="text-muted-foreground">
                                            Try adjusting your search or filter to find what you're looking for.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Contact CTA */}
                        <div className="text-center mt-12 p-8 bg-muted/50 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                            <p className="text-muted-foreground mb-4">
                                Can't find the answer you're looking for? Please contact our support team.
                            </p>
                            <Button asChild size="lg">
                                <a href="/contact">Contact Support</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default FAQ;