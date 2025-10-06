const Stats = () => {
    const stats = [
        { number: "50K+", label: "Active Riders" },
        { number: "10K+", label: "Verified Drivers" },
        { number: "1M+", label: "Rides Completed" },
        { number: "4.8", label: "Average Rating" },
    ];

    return (
        <section className="py-16 bg-primary/5 rounded-lg my-10">
            <div className="sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                                {stat.number}
                            </div>
                            <div className="text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;