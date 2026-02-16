
export type StrengthType = 'Com' | 'Tech' | 'Créa' | 'Struct' | 'Lead' | 'Ana' | 'Rel' | 'Vision';

export interface ScoreSet {
  Com: number;
  Tech: number;
  Créa: number;
  Struct: number;
  Lead: number;
  Ana: number;
  Rel: number;
  Vision: number;
}

export interface Option {
  id: string;
  text: string;
  points: Partial<ScoreSet>;
}

export interface Question {
  id: number;
  title: string;
  category: string;
  options: Option[];
}

export interface University {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  specialties: string[];
}

export interface TechRole {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  salary: string;
}

export interface JobMatch {
  title: string;
  match: number;
  description: string;
}

export interface RoadmapYear {
  year: number;
  goal: string;
  milestones: string[];
}

export interface Profile {
  name: string;
  description: string;
  jobs: JobMatch[];
  salaryRange: string;
  roadmap: RoadmapYear[];
}

export interface User {
  email: string;
  isLoggedIn: boolean;
}
