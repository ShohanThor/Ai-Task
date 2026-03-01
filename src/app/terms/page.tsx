import React from 'react';

export default function TermsOfService() {
    return (
        <div className="py-20 bg-white min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-10 text-center">Terms of Service</h1>
                <div className="prose prose-lg text-gray-700 mx-auto space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                        <p className="leading-relaxed">
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Student Management System, concerning your access to and use of our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
                        <p className="leading-relaxed">
                            Unless otherwise indicated, the platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the platform are owned or controlled by us.
                        </p>
                    </section>

                    <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                        <h2 className="text-2xl font-bold text-primary mb-4">3. User Conduct</h2>
                        <p className="leading-relaxed">
                            You may not access or use the platform for any purpose other than that for which we make the platform available. The platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
