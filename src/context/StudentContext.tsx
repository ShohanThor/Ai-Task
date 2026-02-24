"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, StudentContextType } from '@/lib/types';

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<Student[]>([]);

    // Load from localStorage on mount (optional, but good for "local state" feel)
    useEffect(() => {
        const saved = localStorage.getItem('students');
        if (saved) {
            try {
                setStudents(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse students from localStorage", e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    const addStudent = (studentData: Omit<Student, 'id'>) => {
        const newStudent: Student = {
            ...studentData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setStudents((prev) => [...prev, newStudent]);
    };

    const updateStudent = (updatedStudent: Student) => {
        setStudents((prev) =>
            prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
        );
    };

    const deleteStudent = (id: string) => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
    };

    const getStudentById = (id: string) => {
        return students.find((s) => s.id === id);
    };

    return (
        <StudentContext.Provider
            value={{ students, addStudent, updateStudent, deleteStudent, getStudentById }}
        >
            {children}
        </StudentContext.Provider>
    );
};

export const useStudents = () => {
    const context = useContext(StudentContext);
    if (context === undefined) {
        throw new Error('useStudents must be used within a StudentProvider');
    }
    return context;
};
