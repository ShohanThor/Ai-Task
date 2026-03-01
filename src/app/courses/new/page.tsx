"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCourses } from '@/context/CourseContext';
import CourseForm from '@/components/CourseForm';
import Link from 'next/link';

const AddCoursePage = () => {
    const { addCourse } = useCourses();
    const router = useRouter();

    const handleSubmit = (data: any) => {
        addCourse(data);
        router.push('/courses');
    };

    return (
        <div className="py-12 bg-gray-50 min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/courses" className="text-primary font-bold hover:underline flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back to Courses
                    </Link>
                </div>
                <CourseForm
                    title="Create New Course"
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default AddCoursePage;
