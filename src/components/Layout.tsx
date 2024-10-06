// src/components/Layout.tsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto py-8 px-6 lg:px-8">
                {children}
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Layout;
