// src/layouts/PublicLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar'; // Asumiendo que tienes un NavBar
import Footer from '../components/Footer'; // Asumiendo que tienes un Footer

const PublicLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;