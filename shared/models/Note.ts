export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  remainder: Date | null;
}
