import CTA from '@/components/Landing/CTA';
import Features from '@/components/Landing/Features';
import Hero from '@/components/Landing/Hero';
import Stats from '@/components/Landing/Stats';
import React from 'react';

const Home = () => {
    return (
        <div className='bg-background my-10'>
            <Hero/>
            <Features/>
            <Stats/>
            <CTA/>
        </div>
    );
};

export default Home;