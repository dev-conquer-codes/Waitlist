
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  profileImage: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  school: string;
  startDate: string;
  endDate: string;
}

export interface SkillSet {
  technical: string[];
  professional: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillSet;
  languages: Language[];
  projects: Project[];
}

// Constants for resume limits
export const RESUME_LIMITS = {
  SUMMARY_MAX_LENGTH: 400,
  RESPONSIBILITY_MAX_LENGTH: 150,
  PROJECT_DESCRIPTION_MAX_LENGTH: 100,
  MAX_WORK_EXPERIENCES: 3,
  MAX_EDUCATION_ENTRIES: 3,
  MAX_RESPONSIBILITIES: 5,
  MAX_TECHNICAL_SKILLS: 6,
  MAX_PROFESSIONAL_SKILLS: 6,
  MAX_LANGUAGES: 3,
  MAX_PROJECTS: 3,
  INPUT_TEXT_MAX_LENGTH: 50
};
