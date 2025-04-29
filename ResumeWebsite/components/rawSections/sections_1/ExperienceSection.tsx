
import React from 'react';
import { Experience } from "@/ResumeWebsite/types/resume1";

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
  const limitedExperience = experience.slice(0, 3);
  
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>WORK EXPERIENCE</h2>
      {limitedExperience.map((exp) => (
        <div key={exp.id} className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-base">{exp.position}</h3>
            <span className="text-sm">{exp.startDate} – {exp.endDate}</span>
          </div>
          <p className="text-sm italic mb-1">{exp.company}, {exp.location}</p>
          <ul className="space-y-2">
            {exp.descriptions.map((desc, i) => (
              <li key={i} className={bulletPointClass}>
                <span className="text-sm">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
