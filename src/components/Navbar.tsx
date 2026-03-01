"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navLinks = [
        { name: 'Home', href: '/' },
        ...(user ? [
            { name: 'Student List', href: '/students' },
            { name: 'Courses', href: '/courses' },
            { name: 'About Us', href: '/about' },
        ] : []),
        { name: 'Contact', href: '/contact' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-primary text-primary-foreground shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tight mb-4 md:mb-0">
                    SMS
                </Link>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hover:text-opacity-100 transition-colors duration-200 ${isActive(link.href) ? 'font-bold underline underline-offset-4' : 'opacity-80'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-4 ml-4">
                            <span className="text-sm font-medium bg-white/10 px-3 py-1 rounded-full">
                                {user.email}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-white text-primary px-4 py-1 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-white text-primary px-4 py-1 rounded-full font-semibold hover:bg-opacity-90 transition-all ml-4"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
