export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  rollNumber: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  schedule: string;
  instructorId?: string;
  resources?: string[];
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  availability: string;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  courseId: string;
  attendance: number;
  grade: string;
  performance: string;
}

export interface User {
  name?: string;
  email: string;
  password?: string;
}

export interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
}

export interface CourseContextType {
  courses: Course[];
  instructors: Instructor[];
  progress: StudentProgress[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  assignInstructor: (courseId: string, instructorId: string) => void;
  updateProgress: (progress: StudentProgress) => void;
  addProgress: (progress: Omit<StudentProgress, 'id'>) => void;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}
