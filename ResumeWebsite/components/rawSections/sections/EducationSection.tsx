
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
      <h2 className="text-lg font-semibold mb-2 pb-1 border-b border-gray-200">Education</h2>
      {education.map(edu => (
        <div key={edu.id} className="mb-4">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-bold">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
            </div>
            <div className="text-right">
              <span className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</span>
              {edu.gpa && (
                <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
              )}
            </div>
          </div>
          {edu.location && (
            <p className="text-gray-500 text-sm">{edu.location}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
