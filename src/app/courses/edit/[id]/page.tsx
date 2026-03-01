"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useCourses } from '@/context/CourseContext';
import CourseForm from '@/components/CourseForm';
import Link from 'next/link';

const EditCoursePage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { getCourseById, updateCourse } = useCourses();
    const router = useRouter();
    const course = getCourseById(id);

    if (!course) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-700">Course not found</h2>
                <Link href="/courses" className="text-primary hover:underline mt-4 inline-block">
                    Back to Courses
                </Link>
            </div>
        );
    }

    const handleSubmit = (data: any) => {
        updateCourse(data);
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
                    title="Edit Course"
                    initialData={course}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default EditCoursePage;
