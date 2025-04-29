
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";
import SummarySection from '../../rawSections/sections_3/SummarySection';
import MainContent from '../../rawSections/sections_3/MainContent';
import SideContent from '../../rawSections/sections_3/SideContent';


interface ClassicResumePreviewProps {
  resumeData: ResumeData;
}

const ClassicResumePreview: React.FC<ClassicResumePreviewProps> = ({
  resumeData
}) => {
  const {
    personalInfo, extraSection, extraSectionPosition
  } = resumeData;

  const {
    sectionHeadingClass,
    sectionSpacing,
    bulletPointClass
  } = {
    sectionHeadingClass: "text-[#0066cc] uppercase text-base font-bold mb-2",
    sectionSpacing: "mb-6",
    bulletPointClass: "ml-4 before:content-['•'] before:mr-2 before:text-gray-400"
  };

  return (
    <div id="resume-preview" className="w-[210mm] h-[297mm] bg-white mx-auto shadow-lg p-12 overflow-hidden">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-[48px] font-bold mb-1 text-gray-900">{personalInfo.fullName}</h1>
          <p className="text-xl text-gray-700">{personalInfo.title}</p>
        </div>
        <div className="text-right text-sm space-y-1">
          <p className="text-gray-600">{personalInfo.location}</p>
          <p className="text-gray-600">{personalInfo.phone}</p>
          <a href={`mailto:${personalInfo.email}`} className="text-[#0066cc] hover:underline block">
            {personalInfo.email}
          </a>
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="text-[#0066cc] hover:underline block">
              {personalInfo.linkedin.replace('https://', '').replace('www.', '')}
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} className="text-[#0066cc] hover:underline block">
              {personalInfo.website}
            </a>
          )}
        </div>
      </header>

      <div className="flex gap-12">
        <div className="w-[80%]">
          {personalInfo.summary && (
            <SummarySection 
              summary={personalInfo.summary}
              sectionHeadingClass={sectionHeadingClass}
              sectionSpacing={sectionSpacing}
            />
          )}
          <MainContent 
            resumeData={resumeData} 
            sectionHeadingClass={sectionHeadingClass} 
            sectionSpacing={sectionSpacing} 
            bulletPointClass={bulletPointClass} 
          />
        </div>
        <div className="w-[20%]">
          <SideContent resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default ClassicResumePreview;
