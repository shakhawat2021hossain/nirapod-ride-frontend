import Logo from '../../assets/nirapod-ride.png'

const Footer = () => {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="max-w-7xl mx-auto sm:px-6  py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
                            <img className="h-16" src={Logo} />
                        </div>
                        <p className="text-muted-foreground max-w-md">
                            Revolutionizing urban mobility with cutting-edge technology and
                            exceptional service for riders, drivers, and administrators.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
                    <p>&copy; 2024 RideHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;