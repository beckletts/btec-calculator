export type Grade = 'D' | 'M' | 'P' | 'U';

export interface Unit {
  id: string;
  number: number;
  title: string;
  size: number; // GLH (Guided Learning Hours)
  isMandatory: boolean;
  isExternal: boolean;
  grade: Grade | null;
  credits: number;
}

export interface Qualification {
  name: string;
  totalCredits: number;
  requiredPassCredits: number;
  requiredMeritCredits: number;
  requiredDistinctionCredits: number;
  units: Unit[];
}

export interface GradeResult {
  overallGrade: Grade;
  totalCredits: number;
  passCredits: number;
  meritCredits: number;
  distinctionCredits: number;
  mandatoryUnitsComplete: boolean;
  externalUnitsComplete: boolean;
} 