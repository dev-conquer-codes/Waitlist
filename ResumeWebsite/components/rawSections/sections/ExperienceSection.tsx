
import React from 'react';
import { Experience } from "@/ResumeWebsite/types/resume";

interface ExperienceSectionProps {
  experience: Experience[];
  sectionHeadingClass: string;
  sectionSpacing: string;
  bulletPointClass: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  sectionHeadingClass,
  sectionSpacing,
  bulletPointClass
}) => {
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>Experience</h2>
      {experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <div>
              <h3 className="font-bold text-resume-primary">{exp.position}</h3>
              <p className="text-resume-secondary">{exp.company} - {exp.location}</p>
            </div>
            <span className="text-resume-secondary text-sm">{exp.startDate} - {exp.endDate}</span>
          </div>
          <ul className="mt-2">
            {exp.descriptions.map((desc, i) => (
              <li key={i} className={bulletPointClass}>
                {desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
