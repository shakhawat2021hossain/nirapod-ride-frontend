import Footer from '@/components/Shared/Footer';
import Navbar from '@/components/Shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    // console.log(generateRoutes(adminSidebarRoutes));
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar/>
            <div className='flex-1'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;