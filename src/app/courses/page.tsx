"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCourses } from '@/context/CourseContext';
import { Course } from '@/lib/types';

const CourseListPage = () => {
    const { courses, deleteCourse, instructors } = useCourses();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter(
        (course: Course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getInstructorName = (id?: string) => {
        if (!id) return 'Unassigned';
        const inst = instructors.find(i => i.id === id);
        return inst ? inst.name : 'Unknown';
    };

    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete the course "${name}"?`)) {
            deleteCourse(id);
        }
    };

    return (
        <div className="py-12 bg-gray-50 min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-primary mb-2">Course Management</h1>
                        <p className="text-gray-600">Create, manage, and monitor your educational programs.</p>
                    </div>
                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-grow md:w-80">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg
                                className="w-6 h-6 absolute left-4 top-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <Link
                            href="/courses/new"
                            className="bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-opacity-90 transition-all flex items-center shadow-lg active:scale-95"
                        >
                            <span className="mr-2 text-xl">+</span> Add Course
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course: Course) => (
                            <div key={course.id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col group">
                                <div className="h-3 bg-primary/20 group-hover:bg-primary transition-colors"></div>
                                <div className="p-8 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-gray-800 line-clamp-1">{course.name}</h3>
                                        <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                            {course.duration}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                                        {course.description}
                                    </p>

                                    <div className="space-y-3 border-t border-gray-50 pt-6">
                                        <div className="flex items-center text-sm">
                                            <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            <span className="font-semibold text-gray-700">Instructor:</span>
                                            <span className="ml-2 text-gray-600">{getInstructorName(course.instructorId)}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span className="font-semibold text-gray-700">Schedule:</span>
                                            <span className="ml-2 text-gray-600">{course.schedule}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-100">
                                    <Link
                                        href={`/courses/progress?courseId=${course.id}`}
                                        className="text-primary font-bold text-sm hover:underline"
                                    >
                                        Monitor Progress
                                    </Link>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/courses/edit/${course.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Course"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course.id, course.name)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Course"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-white rounded-3xl p-20 text-center shadow-sm border border-dashed border-gray-300">
                            <div className="text-gray-400 mb-4 inline-block p-4 bg-gray-50 rounded-full">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">No courses found</h3>
                            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                                {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding your first course to the curriculum.'}
                            </p>
                            {!searchTerm && (
                                <Link
                                    href="/courses/new"
                                    className="mt-8 inline-block bg-primary text-white px-8 py-3 rounded-2xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
                                >
                                    + Create Your First Course
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseListPage;
