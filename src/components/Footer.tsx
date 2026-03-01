import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p className="opacity-80 mb-2">
                    &copy; {new Date().getFullYear()} Student Management System. All rights reserved.
                </p>
                <div className="flex justify-center space-x-6">
                    <Link href="/privacy" className="hover:underline cursor-pointer font-medium hover:opacity-100 opacity-80 transition-opacity">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:underline cursor-pointer font-medium hover:opacity-100 opacity-80 transition-opacity">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};


export default Footer;
