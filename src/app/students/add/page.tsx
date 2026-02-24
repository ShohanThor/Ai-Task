"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStudents } from '@/context/StudentContext';
import StudentForm from '@/components/StudentForm';

import { Student } from '@/lib/types';

const AddStudentPage = () => {
    const { addStudent } = useStudents();
    const router = useRouter();

    const handleSubmit = (data: Omit<Student, 'id'>) => {
        addStudent(data);
        router.push('/students');
    };


    return (
        <div className="py-16 bg-gray-50 min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4">
                <StudentForm
                    title="Register New Student"
                    onSubmit={handleSubmit}
                />
                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-500 hover:text-primary transition-colors font-medium flex items-center justify-center mx-auto"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Directory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddStudentPage;
