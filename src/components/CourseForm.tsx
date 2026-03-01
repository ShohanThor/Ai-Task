"use client";

import React, { useState, useEffect } from 'react';
import { Course, Instructor } from '@/lib/types';
import { useCourses } from '@/context/CourseContext';

interface CourseFormProps {
    initialData?: Course;
    onSubmit: (data: Omit<Course, 'id'> | Course) => void;
    title: string;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialData, onSubmit, title }) => {
    const { instructors } = useCourses();
    const [formData, setFormData] = useState<Omit<Course, 'id'>>({
        name: '',
        description: '',
        duration: '',
        schedule: '',
        instructorId: '',
        resources: [],
    });

    const [resourceInput, setResourceInput] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                duration: initialData.duration,
                schedule: initialData.schedule,
                instructorId: initialData.instructorId || '',
                resources: initialData.resources || [],
            });
            if (initialData.resources) {
                setResourceInput(initialData.resources.join('\n'));
            }
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleResourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setResourceInput(value);
        const resources = value.split('\n').filter(r => r.trim() !== '');
        setFormData(prev => ({ ...prev, resources }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            onSubmit({ ...formData, id: initialData.id } as Course);
        } else {
            onSubmit(formData);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">{title}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Advanced Web Development"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Provide a brief overview of the course content and objectives."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="e.g. 12 Weeks"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                        <input
                            type="text"
                            name="schedule"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Mon, Wed 6PM-8PM"
                            value={formData.schedule}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                        <select
                            name="instructorId"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                            value={formData.instructorId}
                            onChange={handleChange}
                        >
                            <option value="">Select Instructor (Optional)</option>
                            {instructors.map((inst: Instructor) => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resources (One per line)</label>
                        <textarea
                            name="resources"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Enter resource links or names, one per line..."
                            value={resourceInput}
                            onChange={handleResourceChange}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all shadow-lg transform active:scale-[0.98]"
                    >
                        {initialData ? 'Update Course' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseForm;
