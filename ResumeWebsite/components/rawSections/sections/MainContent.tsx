
import React from 'react';
import { Experience, Project, ResumeData } from "@/ResumeWebsite/types/resume";
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

  const renderExtraSection = () => {
    if (extraSection === 'none') return null;
    if (extraSection === 'achievements' && achievements.length === 0) return null;
    if (extraSection === 'certifications' && certifications.length === 0) return null;

    return (
      <ExtraSection
        achievements={achievements}
        certifications={certifications}
        extraSection={extraSection}
        sectionHeadingClass={sectionHeadingClass}
        sectionSpacing={sectionSpacing}
      />
    );
  };

  const mainContentSections = type === 'experienced'
    ? [
        experience.length > 0 ? () => (
          <ExperienceSection 
            experience={experience}
            sectionHeadingClass={sectionHeadingClass}
            sectionSpacing={sectionSpacing}
            bulletPointClass={bulletPointClass}
          />
        ) : null,
        projects.length > 0 ? () => (
          <ProjectsSection 
            projects={projects}
            sectionHeadingClass={sectionHeadingClass}
            sectionSpacing={sectionSpacing}
            bulletPointClass={bulletPointClass}
          />
        ) : null,
        extraSectionPosition === 'bottom' ? renderExtraSection : null,
      ].filter(Boolean)
    : [
        projects.length > 0 ? () => (
          <ProjectsSection 
            projects={projects}
            sectionHeadingClass={sectionHeadingClass}
            sectionSpacing={sectionSpacing}
            bulletPointClass={bulletPointClass}
          />
        ) : null,
        experience.length > 0 ? () => (
          <ExperienceSection 
            experience={experience}
            sectionHeadingClass={sectionHeadingClass}
            sectionSpacing={sectionSpacing}
            bulletPointClass={bulletPointClass}
          />
        ) : null,
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
