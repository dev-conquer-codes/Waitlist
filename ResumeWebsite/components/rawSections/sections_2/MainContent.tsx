
import React from 'react';
import { ResumeData } from '@/ResumeWebsite/types/resume2'
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import ExtraSection from './ExtraSection';

interface MainContentProps {
  resumeData: ResumeData;
  sectionHeadingClass: string;
  sectionSpacing: string;
  bulletPointClass: string;
}

const MainContent: React.FC<MainContentProps> = ({
  resumeData,
  sectionHeadingClass,
  sectionSpacing,
  bulletPointClass
}) => {
  const { type, experience, projects, achievements, certifications, extraSection, extraSectionPosition } = resumeData;

  const renderExtraSection = () => (
    <ExtraSection
      achievements={achievements}
      certifications={certifications}
      extraSection={extraSection}
      sectionHeadingClass={sectionHeadingClass}
      sectionSpacing={sectionSpacing}
    />
  );

  const mainContentSections = type === 'experienced'
    ? [
        () => <ExperienceSection 
          experience={experience}
          sectionHeadingClass={sectionHeadingClass}
          sectionSpacing={sectionSpacing}
          bulletPointClass={bulletPointClass}
        />,
        () => <ProjectsSection 
          projects={projects}
          sectionHeadingClass={sectionHeadingClass}
          sectionSpacing={sectionSpacing}
          bulletPointClass={bulletPointClass}
        />,
        extraSectionPosition === 'bottom' ? renderExtraSection : null,
      ].filter(Boolean)
    : [
        () => <ProjectsSection 
          projects={projects}
          sectionHeadingClass={sectionHeadingClass}
          sectionSpacing={sectionSpacing}
          bulletPointClass={bulletPointClass}
        />,
        () => <ExperienceSection 
          experience={experience}
          sectionHeadingClass={sectionHeadingClass}
          sectionSpacing={sectionSpacing}
          bulletPointClass={bulletPointClass}
        />,
        extraSectionPosition === 'bottom' ? renderExtraSection : null,
      ].filter(Boolean);

  return (
    <>
      {mainContentSections.map((renderSection:any, index) => (
        <React.Fragment key={index}>
          {renderSection()}
        </React.Fragment>
      ))}
    </>
  );
};

export default MainContent;
