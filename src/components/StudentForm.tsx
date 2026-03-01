"use client";

import React, { useState, useEffect } from 'react';
import { Student } from '@/lib/types';
import { useCourses } from '@/context/CourseContext';

interface StudentFormProps {
    initialData?: Student;
    onSubmit: (data: Omit<Student, 'id'> | Student) => void;
    title: string;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, title }) => {
    const { courses } = useCourses();
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({
        name: '',
        email: '',
        age: 0,
        course: '',
        rollNumber: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                age: initialData.age,
                course: initialData.course,
                rollNumber: initialData.rollNumber,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSubmit({ ...formData, id: initialData.id } as Student);
        } else {
            onSubmit(formData);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{title}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Alex Johnson"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="e.g. alex@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            required
                            min="1"
                            max="100"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            value={formData.age || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                        <input
                            type="text"
                            name="rollNumber"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="e.g. SEC-001"
                            value={formData.rollNumber}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select
                        name="course"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                        value={formData.course}
                        onChange={handleChange}
                    >
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.name}>{course.name}</option>
                        ))}
                        {/* Fallback to original defaults if no courses exist yet */}
                        {courses.length === 0 && (
                            <>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Mathematics">Mathematics</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all shadow-lg transform active:scale-[0.98]"
                    >
                        {initialData ? 'Update Student' : 'Add Student'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
