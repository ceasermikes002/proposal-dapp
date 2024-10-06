// src/components/Footer.tsx

const Footer = () => {
    return (
        <footer className="bg-white border-t mt-auto">
            <div className="container mx-auto py-4 text-center text-gray-500">
                © {new Date().getFullYear()} Proposal Dapp. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
