"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Instructor, StudentProgress, CourseContextType } from '@/lib/types';

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [progress, setProgress] = useState<StudentProgress[]>([]);

    // Seed initial instructors if none exist
    const defaultInstructors: Instructor[] = [
        { id: 'inst-1', name: 'Dr. Sarah Smith', email: 'sarah.smith@example.com', availability: 'Mon-Wed, 9AM-5PM' },
        { id: 'inst-2', name: 'Prof. James Wilson', email: 'james.wilson@example.com', availability: 'Tue-Thu, 10AM-6PM' },
        { id: 'inst-3', name: 'Dr. Emily Brown', email: 'emily.brown@example.com', availability: 'Mon-Fri, 8AM-4PM' },
    ];

    // Load from localStorage on mount
    useEffect(() => {
        const savedCourses = localStorage.getItem('courses');
        const savedInstructors = localStorage.getItem('instructors');
        const savedProgress = localStorage.getItem('progress');

        if (savedCourses) setCourses(JSON.parse(savedCourses));
        if (savedInstructors) {
            setInstructors(JSON.parse(savedInstructors));
        } else {
            setInstructors(defaultInstructors);
        }
        if (savedProgress) setProgress(JSON.parse(savedProgress));
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('courses', JSON.stringify(courses));
    }, [courses]);

    useEffect(() => {
        localStorage.setItem('instructors', JSON.stringify(instructors));
    }, [instructors]);

    useEffect(() => {
        localStorage.setItem('progress', JSON.stringify(progress));
    }, [progress]);

    const addCourse = (courseData: Omit<Course, 'id'>) => {
        const newCourse: Course = {
            ...courseData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setCourses((prev) => [...prev, newCourse]);
    };

    const updateCourse = (updatedCourse: Course) => {
        setCourses((prev) =>
            prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
        );
    };

    const deleteCourse = (id: string) => {
        setCourses((prev) => prev.filter((c) => c.id !== id));
        // Also cleanup progress for this course
        setProgress((prev) => prev.filter((p) => p.courseId !== id));
    };

    const getCourseById = (id: string) => {
        return courses.find((c) => c.id === id);
    };

    const assignInstructor = (courseId: string, instructorId: string) => {
        setCourses((prev) =>
            prev.map((c) => (c.id === courseId ? { ...c, instructorId } : c))
        );
    };

    const addProgress = (progressData: Omit<StudentProgress, 'id'>) => {
        const newProgress: StudentProgress = {
            ...progressData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setProgress((prev) => [...prev, newProgress]);
    };

    const updateProgress = (updatedProgress: StudentProgress) => {
        setProgress((prev) =>
            prev.map((p) => (p.id === updatedProgress.id ? updatedProgress : p))
        );
    };

    return (
        <CourseContext.Provider
            value={{
                courses,
                instructors,
                progress,
                addCourse,
                updateCourse,
                deleteCourse,
                getCourseById,
                assignInstructor,
                addProgress,
                updateProgress
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useCourses = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useCourses must be used within a CourseProvider');
    }
    return context;
};
