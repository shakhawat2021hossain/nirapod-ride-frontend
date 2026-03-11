import { Link } from "react-router-dom";
import Logo from "../../assets/nirapod-ride.png";

const Footer = () => {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="max-w-7xl mx-auto sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <img className="h-16 mb-4" src={Logo} alt="Nirapod Ride" />
                        <p className="text-muted-foreground max-w-md">
                            Revolutionizing urban mobility with cutting-edge technology and
                            exceptional service for riders, drivers, and administrators.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <a
                                    href="mailto:shakhawat.hossain.web@gmail.com"
                                    className="hover:text-primary transition-colors"
                                >
                                    Email Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+8801844588138"
                                    className="hover:text-primary transition-colors"
                                >
                                    Call Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={() => alert("Support chat coming soon")}
                                    className="hover:text-primary transition-colors"
                                >
                                    Live Chat
                                </a>
                            </li>
                        </ul>
                    </div>


                </div>

                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>&copy; 2025 Nirapod Ride. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
