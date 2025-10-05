import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Car, Shield, Zap } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <Users className="h-8 w-8" />,
            title: "For Riders",
            description: "Book rides instantly, track your driver in real-time, and enjoy secure payments with multiple options.",
        },
        {
            icon: <Car className="h-8 w-8" />,
            title: "For Drivers",
            description: "Maximize your earnings with smart ride matching, flexible schedules, and performance insights.",
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "For Admins",
            description: "Monitor platform activity, manage users, and analyze performance with comprehensive dashboards.",
        },
        {
            icon: <Zap className="h-8 w-8" />,
            title: "Lightning Fast",
            description: "Optimized for speed with real-time updates and seamless user experience across all devices.",
        },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Why Choose Our Platform?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Designed with cutting-edge technology to provide the best experience
                        for all users involved in the ride-sharing ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;