
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume1";
import ContactSection from './ContactSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ExtraSection from './ExtraSection';

interface SideContentProps {
  resumeData: ResumeData;
}

const SideContent: React.FC<SideContentProps> = ({ resumeData }) => {
  const { personalInfo, education, skills, extraSection, extraSectionPosition, achievements, certifications } = resumeData;

  return (
    <div className="w-[30%] bg-[#EBF2FA] h-full p-6 overflow-hidden">
      <div className="overflow-auto h-full">
        <ContactSection personalInfo={personalInfo} />
        <EducationSection education={education} />
        <SkillsSection skills={skills} />
        {extraSectionPosition === 'sidebar' && extraSection !== 'none' && (
          <ExtraSection
            achievements={achievements}
            certifications={certifications}
            extraSection={extraSection}
            sectionHeadingClass="text-[#0F52BA] font-bold text-lg mb-4 uppercase border-b border-white pb-1"
            sectionSpacing="mb-6"
          />
        )}
      </div>
    </div>
  );
};

export default SideContent;
