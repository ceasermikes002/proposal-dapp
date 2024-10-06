// src/components/Header.tsx
import React from 'react';
import "../../connection.ts";

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-red-600">
                    Proposal Dapp
                </h1>
                <w3m-button />
            </div>
        </header>
    );
};

export default Header;
