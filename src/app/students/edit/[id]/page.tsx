"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useStudents } from '@/context/StudentContext';
import StudentForm from '@/components/StudentForm';

interface EditStudentPageProps {
    params: Promise<{ id: string }>;
}

import { Student } from '@/lib/types';

const EditStudentPage = ({ params }: EditStudentPageProps) => {
    const { id } = use(params);
    const { getStudentById, updateStudent } = useStudents();
    const router = useRouter();

    const student = getStudentById(id);

    const handleSubmit = (data: Student | Omit<Student, 'id'>) => {
        updateStudent(data as Student);
        router.push('/students');
    };


    if (!student) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Not Found</h2>
                <button
                    onClick={() => router.push('/students')}
                    className="bg-primary text-white px-6 py-2 rounded-lg"
                >
                    Back to Directory
                </button>
            </div>
        );
    }

    return (
        <div className="py-16 bg-gray-50 min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4">
                <StudentForm
                    title={`Edit Student: ${student.name}`}
                    initialData={student}
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
                        Cancel and Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditStudentPage;
