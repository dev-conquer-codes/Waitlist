
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
  if (experience.length === 0) return null;
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>Experience</h2>
      {experience.map((exp) => (
        <div key={exp.id} className="mb-6">
          <div className="mb-1">
            <h3 className="text-base font-semibold">{exp.position}</h3>
            <div className="text-sm text-gray-600 flex justify-between items-baseline">
              <span>{exp.company}, {exp.location}</span>
              <span>{exp.startDate} – {exp.endDate}</span>
            </div>
          </div>
          <ul className="mt-2 space-y-1">
            {exp.descriptions.map((desc, i) => (
              <li key={i} className={bulletPointClass}>
                <span className="text-sm text-gray-700">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;
