
import React from 'react';
import { Education } from '@/ResumeWebsite/types/resume2';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education
}) => {
  if (education.length === 0) return null;
  return <div className="mb-6">
      <h2 className="text-[#0F52BA] font-bold text-lg mb-4 uppercase border-b border-white pb-1">EDUCATION</h2>
      {education.map(edu => <div key={edu.id} className="mb-4">
          <div>
            <h3 className="font-semibold text-sm">{edu.institution}</h3>
            <p className="text-sm">Associate of {edu.degree}</p>
            <p className="text-sm text-gray-600">{edu.location}</p>
            <p className="text-sm text-gray-600 flex justify-between items-center">
              <span>{edu.startDate} - {edu.endDate}</span>
              {edu.gpa && <span className="text-black font-semibold">
                  (GPA: {edu.gpa})
                </span>}
            </p>
          </div>
        </div>)}
    </div>;
};

export default EducationSection;
