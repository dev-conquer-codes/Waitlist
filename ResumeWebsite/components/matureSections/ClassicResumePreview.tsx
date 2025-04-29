
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";
import SummarySection from '../rawSections/sections/SummarySection';
import EducationSection from '../rawSections/sections/EducationSection';
import MainContent from '../rawSections/sections/MainContent';
import ExtraSection from '../rawSections/sections/ExtraSection';


interface ClassicResumePreviewProps {
  resumeData: ResumeData;
}

const ClassicResumePreview: React.FC<ClassicResumePreviewProps> = ({
  resumeData
}) => {
  const { personalInfo, education, skills, achievements, certifications, extraSection } = resumeData;

  const formatUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div id="resume-preview" className="w-[210mm] h-[297mm] bg-white mx-auto p-12 overflow-hidden">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && (
            <>
              <span className="text-gray-300">•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.email && (
            <>
              <span className="text-gray-300">•</span>
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </>
          )}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex items-center justify-center gap-3 text-sm text-gray-600 mt-1">
            {personalInfo.linkedin && (
              <a 
                href={formatUrl(personalInfo.linkedin)} 
                className="hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.linkedin && personalInfo.website && <span className="text-gray-300">•</span>}
            {personalInfo.website && (
              <a 
                href={formatUrl(personalInfo.website)} 
                className="hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        )}
      </header>

      <div className="space-y-6">
        {personalInfo.summary && (
          <SummarySection 
            summary={personalInfo.summary}
            sectionHeadingClass="text-lg font-semibold mb-2 pb-1 border-b border-gray-200"
            sectionSpacing="mb-6"
          />
        )}
        
        {education.length > 0 && (
          <EducationSection education={education} />
        )}
        
        <MainContent 
          resumeData={resumeData}
          sectionHeadingClass="text-lg font-semibold mb-2 pb-1 border-b border-gray-200"
          sectionSpacing="mb-6"
          bulletPointClass="ml-4 before:content-['•'] before:mr-2 before:text-gray-400"
        />

        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {(extraSection !== 'none' && (achievements.length > 0 || certifications.length > 0)) && (
          <ExtraSection
            achievements={achievements}
            certifications={certifications}
            extraSection={extraSection}
            sectionHeadingClass="text-lg font-semibold mb-2 pb-1 border-b border-gray-200"
            sectionSpacing="mb-6"
          />
        )}
      </div>
    </div>
  );
};

export default ClassicResumePreview;
