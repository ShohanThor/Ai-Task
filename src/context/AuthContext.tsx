"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/lib/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        const userData = { email };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        // Set a cookie for middleware
        document.cookie = `auth_token=true; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
        document.cookie = `user_email=${email}; path=/; max-age=${60 * 60 * 24 * 7}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // Clear cookies
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "user_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
