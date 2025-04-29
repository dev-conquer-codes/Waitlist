
import React from 'react';
import { Skill } from "@/ResumeWebsite/types/resume1";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <div className="mb-6">
      <h2 className="text-[#0F52BA] font-bold text-lg mb-4 uppercase border-b border-white pb-1">SKILLS</h2>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill.id} className="flex items-start">
            <span className="text-sm mr-2">•</span>
            <span className="text-sm">{skill.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsSection;
