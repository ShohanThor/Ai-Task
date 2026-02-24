"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudents } from '@/context/StudentContext';
import { Student } from '@/lib/types';

const StudentListPage = () => {
    const { students, deleteStudent } = useStudents();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(
        (student: Student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );




    const handleDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            deleteStudent(id);
        }
    };

    return (
        <div className="py-12 bg-gray-50 min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-primary">Student Directory</h1>
                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-grow md:w-64">
                            <input
                                type="text"
                                placeholder="Search by name, roll, course..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg
                                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <Link
                            href="/students/add"
                            className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center whitespace-nowrap"
                        >
                            <span className="mr-2">+</span> Add New
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Roll No</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student: Student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 bg-primary/5 text-primary text-xs font-bold rounded">
                                                    {student.rollNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{student.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{student.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">{student.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                                <Link
                                                    href={`/students/edit/${student.id}`}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors inline-block p-1"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(student.id, student.name)}
                                                    className="text-red-600 hover:text-red-800 transition-colors inline-block p-1"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                                            {searchTerm ? 'No students found matching your search.' : 'No students registered yet.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentListPage;
