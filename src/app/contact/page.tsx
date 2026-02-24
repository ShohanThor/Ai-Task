"use client";

import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, you'd send this to an API
    };

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                        <p className="text-gray-600 mb-8">
                            Have questions or need assistance? Our support team is here to help you. Fill out the form and we'll get back to you within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Email</h3>
                                    <p className="text-gray-600 font-medium">support@sms-admin.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-4 shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">Visit Us</h3>
                                    <p className="text-gray-600 font-medium">123 Education Lane, Learning City, 56789</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h2>
                                <p className="text-gray-600">Thank you for reaching out. We'll be in touch soon.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
