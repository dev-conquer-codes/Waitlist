
import React from 'react';
import { Skill } from "@/ResumeWebsite/types/resume";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (skills.length === 0) return null;
  return (
    <div className="mb-6">
      <h2 className="text-[#0066cc] uppercase text-base font-bold mb-2">Skills</h2>
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.id} className="flex justify-between items-baseline">
            <span className="text-sm text-gray-700">{skill.name}</span>
            {/* <span className="text-sm text-gray-500">8 years</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
