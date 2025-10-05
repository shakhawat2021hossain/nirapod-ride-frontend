import { Button } from "@/components/ui/button";

const CTA = () => {
    return (
        <section className="my-16 py-20 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg">
            <div className="sm:px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Ready to Get Started?
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                    Join thousands of satisfied users and experience the future of ride booking today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-8 py-3"
                    >
                        Sign Up as Rider
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
                    >
                        Become a Driver
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CTA;