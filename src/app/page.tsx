import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Empowering Education with <span className="text-opacity-90">Seamless Management</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
              Streamline your school administrative tasks, track student progress, and manage records with our intuitive and powerful Student Management System.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/students/add"
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/student_system_hero.png" // This will be the generated image path
                alt="Student Management System Hero"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Core Features</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Add Students</h3>
              <p className="text-gray-600">Quickly register new students with our easy-to-use digital enrollment form.</p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Student Directory</h3>
              <p className="text-gray-600">Browse and manage all student records in a centralized, searchable database.</p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Records</h3>
              <p className="text-gray-600">Update crucial information and track changes to student profiles instantly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
