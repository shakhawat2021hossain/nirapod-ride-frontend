import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, CheckCircle, Award, Globe } from 'lucide-react';

const About = () => {
    const teamMembers = [
        {
            name: "Sarah Chen",
            role: "CEO & Founder",
            bio: "Former transportation executive with 15+ years in mobility solutions.",
            image: "/team/sarah.jpg"
        },
        {
            name: "Marcus Rodriguez",
            role: "CTO",
            bio: "Tech innovator specializing in real-time systems and scalable architecture.",
            image: "/team/marcus.jpg"
        },
        {
            name: "Emily Watson",
            role: "Head of Operations",
            bio: "Operations expert focused on driver partnerships and city expansions.",
            image: "/team/emily.jpg"
        },
        {
            name: "David Kim",
            role: "Head of Safety",
            bio: "Security specialist dedicated to passenger and driver safety protocols.",
            image: "/team/david.jpg"
        }
    ];

    const values = [
        {
            icon: Shield,
            title: "Safety First",
            description: "Your security is our top priority with comprehensive background checks and real-time monitoring."
        },
        {
            icon: Users,
            title: "Community Focus",
            description: "Building stronger communities by connecting people and creating economic opportunities."
        },
        {
            icon: Zap,
            title: "Innovation",
            description: "Constantly improving our technology to provide the best experience for all users."
        },
        {
            icon: Heart,
            title: "Customer Care",
            description: "Dedicated support team available 24/7 to assist with any questions or concerns."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            About <span className="text-primary">Nirapod Ride</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Revolutionizing urban mobility with safe, reliable, and affordable transportation solutions for everyone.
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Story */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Founded in 2020, Nirapod Ride emerged from a simple vision: to make urban transportation safer,
                                more reliable, and accessible to everyone. Our name "Nirapod" means "safe" in Bengali, reflecting
                                our core commitment to passenger and driver safety.
                            </p>
                            <p className="text-lg text-muted-foreground mb-8">
                                What started as a small startup in a single city has grown into a comprehensive ride-sharing platform
                                operating across multiple countries. We've successfully completed over 1 million rides while maintaining
                                our commitment to quality and safety.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-primary/5 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                                    <div className="text-muted-foreground">Rides Completed</div>
                                </div>
                                <div className="text-center p-4 bg-primary/5 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                                    <div className="text-muted-foreground">Active Drivers</div>
                                </div>
                                <div className="text-center p-4 bg-primary/5 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                                    <div className="text-muted-foreground">Cities</div>
                                </div>
                                <div className="text-center p-4 bg-primary/5 rounded-lg">
                                    <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                                    <div className="text-muted-foreground">Average Rating</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
                            <Globe className="h-32 w-32 text-primary/50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-muted/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <Card>
                            <CardHeader>
                                <Target className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    To create seamless, safe, and sustainable transportation solutions that connect communities
                                    and empower individuals through innovative technology.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Provide affordable transportation for all
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Create flexible earning opportunities
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Build sustainable urban mobility
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Award className="h-12 w-12 text-primary mb-4" />
                                <CardTitle>Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    A world where everyone has access to reliable, affordable, and environmentally conscious
                                    transportation options at their fingertips.
                                </p>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Zero transportation deserts
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Carbon-neutral operations
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        Global community connectivity
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The principles that guide everything we do at Nirapod Ride.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <Card key={index} className="text-center">
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-lg">{value.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm">{value.description}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-muted/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The passionate individuals driving innovation and excellence at Nirapod Ride.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="text-center">
                                <CardContent className="pt-6">
                                    <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Users className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                    <p className="text-primary mb-3">{member.role}</p>
                                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Add missing icons
const Shield = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const Zap = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export default About;