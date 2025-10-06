import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Car, CheckCircle, MapPin, Clock, DollarSign, Star, BarChart, Shield } from 'lucide-react';

const Features = () => {
    const [activeTab, setActiveTab] = useState<'rider' | 'driver'>('rider');

    const features = {
        rider: [
            {
                icon: MapPin,
                title: "Real-time Tracking",
                description: "Track your driver's location in real-time with live GPS updates"
            },
            {
                icon: Clock,
                title: "Instant Booking",
                description: "Book rides in seconds with our intuitive interface"
            },
            {
                icon: DollarSign,
                title: "Transparent Pricing",
                description: "See fare estimates before you book with no hidden charges"
            },
            {
                icon: Star,
                title: "Driver Ratings",
                description: "Choose drivers based on ratings and reviews from other riders"
            },
            {
                icon: Users,
                title: "Multiple Ride Options",
                description: "Select from Economy, Comfort, or Premium vehicle types"
            },
            {
                icon: Shield,
                title: "Safety Features",
                description: "Share trip details with emergency contacts and access 24/7 support"
            }
        ],
        driver: [
            {
                icon: DollarSign,
                title: "Flexible Earnings",
                description: "Choose when to drive and maximize your earnings with surge pricing"
            },
            {
                icon: MapPin,
                title: "Smart Navigation",
                description: "Optimized routes and turn-by-turn navigation for efficient trips"
            },
            {
                icon: BarChart,
                title: "Earnings Dashboard",
                description: "Track your performance, earnings, and ratings in real-time"
            },
            {
                icon: Clock,
                title: "Flexible Schedule",
                description: "Work whenever you want with no fixed hours or commitments"
            },
            {
                icon: Star,
                title: "Rating System",
                description: "Build your reputation and get matched with better rides"
            },
            {
                icon: Users,
                title: "Bonus Programs",
                description: "Earn extra with quests, streaks, and referral bonuses"
            }
        ]
    };

    const tabConfig = {
        rider: { title: "For Riders", description: "Everything you need for convenient and safe transportation" },
        driver: { title: "For Drivers", description: "Tools and features to maximize your earnings and flexibility" }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Platform <span className="text-primary">Features</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Comprehensive solutions designed for riders and drivers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature Tabs */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Tab Navigation */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                            {[
                                { id: 'rider' as const, label: 'For Riders', icon: Users },
                                { id: 'driver' as const, label: 'For Drivers', icon: Car }
                            ].map((tab) => {
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-6 py-4 rounded-lg font-medium transition-all ${activeTab === tab.id
                                                ? 'bg-primary text-primary-foreground shadow-lg'
                                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                            }`}
                                    >
                                        <IconComponent className="h-5 w-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Content */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">{tabConfig[activeTab].title}</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                {tabConfig[activeTab].description}
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features[activeTab].map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <Card key={index} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                    <IconComponent className="h-5 w-5" />
                                                </div>
                                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-base">
                                                {feature.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Platform Overview</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            See how our platform serves both riders and drivers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {Object.entries(tabConfig).map(([key, config]) => {
                            const tabKey = key as keyof typeof tabConfig;
                            const IconComponent = tabKey === 'rider' ? Users : Car;

                            return (
                                <Card key={key} className={`text-center ${activeTab === tabKey ? 'ring-2 ring-primary' : ''
                                    }`}>
                                    <CardHeader>
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <CardTitle>{config.title}</CardTitle>
                                        <CardDescription>{config.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {features[tabKey].slice(0, 4).map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                    {feature.title}
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            variant={activeTab === tabKey ? "default" : "outline"}
                                            className="w-full mt-4"
                                            onClick={() => setActiveTab(tabKey)}
                                        >
                                            {activeTab === tabKey ? "Currently Viewing" : "View Features"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Add Button component
const Button = ({
    variant = "default",
    className,
    onClick,
    children
}: {
    variant?: "default" | "outline";
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
    const variants = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Features;