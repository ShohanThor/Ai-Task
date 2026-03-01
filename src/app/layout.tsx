import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StudentProvider } from "@/context/StudentContext";
import { AuthProvider } from "@/context/AuthContext";
import { CourseProvider } from "@/context/CourseContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Management System",
  description: "A simple and functional student management system built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <AuthProvider>
          <StudentProvider>
            <CourseProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </CourseProvider>
          </StudentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

