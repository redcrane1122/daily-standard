export interface StandupEntry {
  id: string;
  name: string;
  date: string;
  yesterday: string;
  today: string;
  blockers: string | null;
  createdAt: Date;
  updatedAt: Date;
}

