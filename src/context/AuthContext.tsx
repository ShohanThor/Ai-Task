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

    const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
        const usersJson = localStorage.getItem('users');
        const users: User[] = usersJson ? JSON.parse(usersJson) : [];

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser: User = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return { success: true, message: 'Registration successful' };
    };

    const login = async (email: string, password?: string): Promise<{ success: boolean; message: string }> => {
        // Hardcoded admin check
        if (email === 'admin@gmail.com' && password === 'admin123') {
            const userData = { email, name: 'Admin' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            document.cookie = `auth_token=true; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `user_email=${email}; path=/; max-age=${60 * 60 * 24 * 7}`;
            return { success: true, message: 'Login successful' };
        }

        const usersJson = localStorage.getItem('users');
        const users: User[] = usersJson ? JSON.parse(usersJson) : [];
        const userFound = users.find(u => u.email === email && u.password === password);

        if (userFound) {
            const { password: _, ...userData } = userFound;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            document.cookie = `auth_token=true; path=/; max-age=${60 * 60 * 24 * 7}`;
            document.cookie = `user_email=${email}; path=/; max-age=${60 * 60 * 24 * 7}`;
            return { success: true, message: 'Login successful' };
        }

        return { success: false, message: 'Invalid email or password' };
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
        <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
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
