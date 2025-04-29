
import React from 'react';
import { Education } from "@/ResumeWebsite/types/resume";

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education
}) => {
  if (education.length === 0) return null;
  return (
    <div className="mb-6">
      <h2 className="text-[#0066cc] uppercase text-base font-bold mb-2">Education</h2>
      {education.map(edu => (
        <div key={edu.id} className="mb-4">
          <h3 className="text-base font-semibold">{edu.degree}</h3>
          <p className="text-sm text-gray-600">{edu.institution}</p>
          <div className="text-sm text-gray-500 flex justify-between items-center mt-1">
            <span>{edu.startDate} - {edu.endDate}</span>
            {edu.gpa && <span>GPA: {edu.gpa}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
