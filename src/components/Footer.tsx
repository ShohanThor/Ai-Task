const Footer = () => {
    return (
        <footer className="bg-primary text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p className="opacity-80 mb-2">
                    &copy; {new Date().getFullYear()} Student Management System. All rights reserved.
                </p>
                <div className="flex justify-center space-x-6">
                    <span className="hover:underline cursor-pointer font-medium">Privacy Policy</span>
                    <span className="hover:underline cursor-pointer font-medium">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
