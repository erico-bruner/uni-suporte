type Request = {
  id: number;
  studentId: number;
  course: string;
  period: string;
  subject: string;
  status: string;
  file: File;
};

export const REQUESTS: Request[] = [];
