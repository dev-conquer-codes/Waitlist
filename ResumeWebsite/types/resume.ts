export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  descriptions: string[];
}

export interface Project {
  id: string;
  title: string;
  technologies: string;
  startDate: string;
  endDate: string;
  descriptions: string[];
}

export interface Skill {
  id: string;
  name: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export type ResumeType = "fresher" | "experienced";
export type ExtraSection = "achievements" | "certifications" | "none";
export type ExtraSectionPosition = "sidebar" | "bottom";

export interface ResumeData {
  type: ResumeType;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  certifications: Certification[];
  extraSection: ExtraSection;
  extraSectionPosition: ExtraSectionPosition;
}

export const MAX_DESCRIPTION_LENGTH = 150;
export const MAX_EXPERIENCES = 3;
export const MAX_PROJECTS = 3;
export const MAX_SKILLS = 8;
export const MAX_SUMMARY_LENGTH = 200;
