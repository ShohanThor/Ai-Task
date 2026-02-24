export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  rollNumber: string;
}

export interface User {
  email: string;
}

export interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}
