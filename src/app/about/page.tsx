export default function About() {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Us</h1>
                <div className="prose prose-lg text-gray-700 mx-auto">
                    <p className="mb-6 leading-relaxed">
                        Welcome to the <strong>Student Management System (SMS)</strong>, a cutting-edge platform designed to revolutionize educational administration. Our mission is to simplify complex administrative tasks and empower educational institutions with tools that foster growth and efficiency.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
                            <p className="text-gray-600">
                                To be the global leader in educational technology, providing seamless and intuitive solutions that allow educators to focus on what matters most: teaching.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-primary mb-4">Our Commitment</h2>
                            <p className="text-gray-600">
                                We are committed to data integrity, user-friendly experiences, and continuous innovation, ensuring our platform evolves with the needs of modern schools.
                            </p>
                        </div>
                    </div>
                    <div className="mt-16 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Why Choose Us?</h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span> Real-time Data Management
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span> Intuitive Dashboard
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span> Secure Record Keeping
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary mr-2">✓</span> Responsive Support
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
