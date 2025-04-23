import React from 'react';
import { ResumeData } from "../../types/resume";
import MainContent from '../rawSections/sections_1/MainContent';
import SideContent from '../rawSections/sections_1/SideContent';
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
    sectionHeadingClass: "text-[#0F52BA] text-lg font-bold border-b border-[#0F52BA] pb-1 mb-4",
    sectionSpacing: "mb-6",
    bulletPointClass: "ml-5 before:content-['•'] before:absolute before:left-0 before:text-[#0F52BA] relative pl-4"
  };
  return <div id="resume-preview" className="w-[210mm] h-[297mm] bg-white mx-auto shadow-lg overflow-hidden flex">
      <div className="w-[70%] p-10">
        <header className="mb-8">
          <h1 className="text-[#0F52BA] text-4xl font-bold mb-1">{personalInfo.fullName}</h1>
          <p className="text-gray-700 text-lg mb-3">{personalInfo.title}</p>
          {personalInfo.summary && <div className="mb-4">
              <h2 className={sectionHeadingClass}>SUMMARY</h2>
              <p className="text-sm text-black text-justify font-normal">{personalInfo.summary}</p>
            </div>}
        </header>
        
        <MainContent resumeData={resumeData} sectionHeadingClass={sectionHeadingClass} sectionSpacing={sectionSpacing} bulletPointClass={bulletPointClass} />
      </div>
      
      <SideContent resumeData={resumeData} />
    </div>;
};
export default ClassicResumePreview;
