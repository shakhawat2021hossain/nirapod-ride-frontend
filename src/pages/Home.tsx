import CTA from '@/components/Landing/CTA';
import Features from '@/components/Landing/Features';
import Hero from '@/components/Landing/Hero';
import Stats from '@/components/Landing/Stats';

const Home = () => {
    return (
        <div className='bg-background my-10 max-w-7xl mx-auto px-4 sm:px-6'>
            <Hero/>
            <Features/>
            <Stats/>
            <CTA/>
        </div>
    );
};

export default Home;