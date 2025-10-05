import Footer from '@/components/Shared/Footer';
import Navbar from '@/components/Shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar/>
            <div className='gow-1 max-w-7xl mx-auto'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;