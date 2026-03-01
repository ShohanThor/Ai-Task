import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="py-20 bg-white min-h-[calc(100vh-160px)]">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-10 text-center">Privacy Policy</h1>
                <div className="prose prose-lg text-gray-700 mx-auto space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p className="leading-relaxed">
                            We collect personal information that you provide to us when you register on our Student Management System, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                        <p className="leading-relaxed">
                            We use personal information collected via our platform for various business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send administrative information to you.</li>
                            <li>To protect our Services.</li>
                            <li>To respond to user inquiries/offer support to users.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary mb-4">3. Data Security</h2>
                        <p className="leading-relaxed italic text-gray-600">
                            We aim to protect your personal information through a system of organizational and technical security measures. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have questions or comments about this policy, you may email us at <strong>privacy@sms-platform.com</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
