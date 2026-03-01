"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCourses } from '@/context/CourseContext';
import { useStudents } from '@/context/StudentContext';
import { Student, StudentProgress } from '@/lib/types';
import Link from 'next/link';

const ProgressPageContent = () => {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const { getCourseById, progress, addProgress, updateProgress } = useCourses();
    const { students } = useStudents();

    const course = courseId ? getCourseById(courseId) : null;
    const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Omit<StudentProgress, 'id' | 'studentId' | 'courseId'>>({
        attendance: 0,
        grade: '',
        performance: '',
    });

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

    // Filter students who are enrolled in this course (by name or some other field)
    const courseStudents = students.filter(s => s.course === course.name);

    const getProgressForStudent = (studentId: string) => {
        return progress.find(p => p.studentId === studentId && p.courseId === course.id);
    };

    const handleEdit = (studentId: string) => {
        const existing = getProgressForStudent(studentId);
        setEditingStudentId(studentId);
        if (existing) {
            setEditData({
                attendance: existing.attendance,
                grade: existing.grade,
                performance: existing.performance,
            });
        } else {
            setEditData({ attendance: 0, grade: '', performance: '' });
        }
    };

    const handleSave = (studentId: string) => {
        const existing = getProgressForStudent(studentId);
        if (existing) {
            updateProgress({ ...existing, ...editData });
        } else {
            addProgress({
                studentId,
                courseId: course.id,
                ...editData,
            });
        }
        setEditingStudentId(null);
    };

    return (
        <div className="py-12 bg-gray-50 min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div>
                        <Link href="/courses" className="text-primary font-bold hover:underline mb-4 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                            Back to Courses
                        </Link>
                        <h1 className="text-4xl font-bold text-primary mt-2">Student Progress</h1>
                        <p className="text-gray-600 mt-1">Monitoring: <span className="font-bold text-gray-800">{course.name}</span></p>
                    </div>
                    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex gap-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Students</p>
                            <p className="text-2xl font-bold text-primary">{courseStudents.length}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Avg. Attendance</p>
                            <p className="text-2xl font-bold text-primary">
                                {courseStudents.length > 0
                                    ? Math.round(courseStudents.reduce((acc, s) => acc + (getProgressForStudent(s.id)?.attendance || 0), 0) / courseStudents.length)
                                    : 0}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Student Name</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Attendance</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Grade</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Performance</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {courseStudents.length > 0 ? (
                                    courseStudents.map((student: Student) => {
                                        const prog = getProgressForStudent(student.id);
                                        const isEditing = editingStudentId === student.id;

                                        return (
                                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-gray-800">{student.name}</p>
                                                    <p className="text-xs text-gray-500 font-mono">{student.rollNumber}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {isEditing ? (
                                                        <div className="flex items-center">
                                                            <input
                                                                type="number"
                                                                className="w-20 px-3 py-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                                                value={editData.attendance}
                                                                onChange={(e) => setEditData({ ...editData, attendance: parseInt(e.target.value) || 0 })}
                                                                min="0"
                                                                max="100"
                                                            />
                                                            <span className="ml-2 text-gray-600">%</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <div className="w-16 h-2 bg-gray-100 rounded-full mr-3 overflow-hidden">
                                                                <div
                                                                    className="h-full bg-primary"
                                                                    style={{ width: `${prog?.attendance || 0}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-700">{prog?.attendance || 0}%</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            className="w-16 px-3 py-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary uppercase text-center"
                                                            value={editData.grade}
                                                            onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
                                                            placeholder="A"
                                                        />
                                                    ) : (
                                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${!prog?.grade ? 'bg-gray-100 text-gray-400' :
                                                            prog.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                                                                prog.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                                                                    prog.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {prog?.grade || 'N/A'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            className="w-full min-w-[200px] px-3 py-1 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                                            value={editData.performance}
                                                            onChange={(e) => setEditData({ ...editData, performance: e.target.value })}
                                                            placeholder="Great progress..."
                                                        />
                                                    ) : (
                                                        <span className="text-sm text-gray-600 italic">
                                                            {prog?.performance || 'No remarks yet.'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-right whitespace-nowrap">
                                                    {isEditing ? (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => setEditingStudentId(null)}
                                                                className="px-4 py-1 text-sm font-bold text-gray-500 hover:text-gray-700"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={() => handleSave(student.id)}
                                                                className="px-4 py-1 text-sm font-bold bg-primary text-white rounded-lg hover:bg-opacity-90"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEdit(student.id)}
                                                            className="text-primary hover:underline font-bold text-sm"
                                                        >
                                                            Update Status
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-gray-500 italic">
                                            No students currently enrolled in this course.
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

const ProgressPage = () => {
    return (
        <Suspense fallback={
            <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Loading progress data...</p>
            </div>
        }>
            <ProgressPageContent />
        </Suspense>
    );
};

export default ProgressPage;
