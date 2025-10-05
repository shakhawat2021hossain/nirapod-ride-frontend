import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Car, ShieldCheck, Zap, MapPin, Star, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
    const [activeRole, setActiveRole] = useState(0);

    const roles = [
        {
            icon: <Users className="h-6 w-6" />,
            title: "Riders",
            description: "Book rides instantly with real-time tracking and secure payments",
            features: ["Instant Booking", "Live Tracking", "Multiple Payment Options", "Ride History"],
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Car className="h-6 w-6" />,
            title: "Drivers",
            description: "Maximize earnings with smart ride matching and flexible schedules",
            features: ["Smart Matching", "Earnings Dashboard", "Flexible Hours", "Performance Insights"],
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <ShieldCheck className="h-6 w-6" />,
            title: "Admins",
            description: "Monitor platform activity and manage operations with comprehensive tools",
            features: ["Real-time Analytics", "User Management", "Revenue Reports", "Platform Control"],
            color: "from-purple-500 to-pink-500"
        }
    ];

    const stats = [
        { icon: <Zap className="h-5 w-5" />, value: "30s", label: "Avg. Response" },
        { icon: <MapPin className="h-5 w-5" />, value: "50+", label: "Cities" },
        { icon: <Star className="h-5 w-5" />, value: "4.8★", label: "Rating" },
        { icon: <TrendingUp className="h-5 w-5" />, value: "1M+", label: "Rides" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRole((prev) => (prev + 1) % roles.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 overflow-hidden py-16 rounded-lg">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:bg-blue-800 dark:opacity-20"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:bg-purple-800 dark:opacity-20"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 dark:bg-cyan-800 dark:opacity-20"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left space-y-8">
                        {/* Platform Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                            <Zap className="h-4 w-4" />
                            All-in-One Ride Management Platform
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                                Smart Ride
                                <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                    Management
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                A comprehensive platform powering seamless experiences for{" "}
                                <span className="font-semibold text-blue-600">riders</span>,{" "}
                                <span className="font-semibold text-green-600">drivers</span>, and{" "}
                                <span className="font-semibold text-purple-600">administrators</span>.
                                Built with cutting-edge technology for modern urban mobility.
                            </p>
                        </div>

                        {/* Role Selection */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            {roles.map((role, index) => (
                                <Button
                                    key={role.title}
                                    variant={activeRole === index ? "default" : "outline"}
                                    className={`gap-2 transition-all duration-300 ${activeRole === index
                                            ? `bg-gradient-to-r ${role.color} text-white border-transparent`
                                            : ''
                                        }`}
                                    onClick={() => setActiveRole(index)}
                                >
                                    {role.icon}
                                    {role.title}
                                </Button>
                            ))}
                        </div>

                        {/* Active Role Description */}
                        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${roles[activeRole].color} text-white`}>
                                    {roles[activeRole].icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{roles[activeRole].title}</h3>
                                    <p className="text-muted-foreground text-sm">{roles[activeRole].description}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {roles[activeRole].features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${roles[activeRole].color}`} />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="text-lg px-8 py-6 gap-2 group">
                                <span>Get Started Free</span>
                                <div className="group-hover:translate-x-1 transition-transform duration-200">
                                    →
                                </div>
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                View Demo
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Platform Dashboard Preview */}
                    <div className="relative">
                        <div className="relative space-y-6">
                            {/* Main Dashboard Card */}
                            <Card className="shadow-2xl border-0 bg-background/80 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600"></div>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-xl">Platform Overview</h3>
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Real-time Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {stats.map((stat, index) => (
                                            <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                                                <div className="flex justify-center mb-2 text-primary">
                                                    {stat.icon}
                                                </div>
                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Active Users */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                            Active Now
                                        </h4>
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                                                <div className="text-lg font-bold text-blue-600">1,243</div>
                                                <div className="text-xs text-muted-foreground">Riders</div>
                                            </div>
                                            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                                                <div className="text-lg font-bold text-green-600">327</div>
                                                <div className="text-xs text-muted-foreground">Drivers</div>
                                            </div>
                                            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                                                <div className="text-lg font-bold text-purple-600">15</div>
                                                <div className="text-xs text-muted-foreground">Admins</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Feature Cards Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Card className="bg-background/60 backdrop-blur-sm border-0 shadow-lg">
                                    <CardContent className="p-4 text-center">
                                        <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <div className="font-semibold">Live Tracking</div>
                                        <div className="text-xs text-muted-foreground">Real-time GPS</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background/60 backdrop-blur-sm border-0 shadow-lg">
                                    <CardContent className="p-4 text-center">
                                        <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <div className="font-semibold">Secure</div>
                                        <div className="text-xs text-muted-foreground">Verified Users</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-background/60 backdrop-blur-sm border-0 shadow-lg">
                                    <CardContent className="p-4 text-center">
                                        <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <div className="font-semibold">Analytics</div>
                                        <div className="text-xs text-muted-foreground">Live Reports</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tech Stack Badge */}
                            {/* <div className="flex justify-center">
                                <div className="bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border shadow-sm">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="font-mono font-semibold">React</span>
                                        <span>•</span>
                                        <span className="font-mono font-semibold">Redux Toolkit</span>
                                        <span>•</span>
                                        <span className="font-mono font-semibold">RTK Query</span>
                                        <span>•</span>
                                        <span className="font-mono font-semibold">TypeScript</span>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                            Live Data
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">Explore Features</span>
                    <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default Hero;