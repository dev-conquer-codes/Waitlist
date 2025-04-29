
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ExtraSection from './ExtraSection';

interface SideContentProps {
  resumeData: ResumeData;
}

const SideContent: React.FC<SideContentProps> = ({ resumeData }) => {
  const { education, skills, extraSection, extraSectionPosition, achievements, certifications } = resumeData;

  return (
    <div className="h-full">
      <EducationSection education={education} />
      <SkillsSection skills={skills} />
      {extraSectionPosition === 'sidebar' && extraSection !== 'none' && (
        <ExtraSection
          achievements={achievements}
          certifications={certifications}
          extraSection={extraSection}
          sectionHeadingClass="text-[#0066cc] uppercase text-base font-bold mb-2"
          sectionSpacing="mb-6"
        />
      )}
    </div>
  );
};

export default SideContent;
