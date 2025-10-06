// pages/Contact.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Phone, Clock, CheckCircle, Send } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    });

    const onSubmit = (data: ContactFormData) => {
        console.log("Contact form data:", data);
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        form.reset();
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: "support@nirapodride.com",
            description: "Send us an email anytime"
        },
        {
            icon: Phone,
            title: "Call Us",
            details: "+1 (555) 123-4567",
            description: "Mon to Fri 9am to 6pm"
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: "123 Innovation Drive, Tech City",
            description: "TC 12345, United States"
        },
        {
            icon: Clock,
            title: "Response Time",
            details: "Within 24 hours",
            description: "For all customer inquiries"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Contact <span className="text-primary">Us</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Get in touch with our team. We're here to help you with any questions.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                                <p className="text-muted-foreground mb-8">
                                    Have questions about our platform? We're here to help. Reach out to us through any of the following channels.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => {
                                    const IconComponent = info.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                <IconComponent className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{info.title}</h3>
                                                <p className="text-primary font-medium">{info.details}</p>
                                                <p className="text-sm text-muted-foreground">{info.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send us a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you within 24 hours.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {submitted ? (
                                        <div className="text-center py-8">
                                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Thank you for contacting us. We'll get back to you soon.
                                            </p>
                                            <Button onClick={() => setSubmitted(false)}>
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Full Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Your full name" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="email"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email Address</FormLabel>
                                                                <FormControl>
                                                                    <Input type="email" placeholder="your.email@example.com" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="subject"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Subject</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="What is this regarding?" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Message</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Please describe your inquiry in detail..."
                                                                    className="min-h-[150px] resize-none"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button type="submit" className="w-full" size="lg">
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Send Message
                                                </Button>
                                            </form>
                                        </Form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Quick Help</h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Check our FAQ section for quick answers to common questions.
                        </p>
                        <Button asChild variant="outline" size="lg">
                            <a href="/faq">Visit FAQ Page</a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;