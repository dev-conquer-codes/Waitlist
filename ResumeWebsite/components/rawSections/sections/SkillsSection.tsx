
import React from 'react';
import { Skill } from "@/ResumeWebsite/types/resume";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (skills.length === 0) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-resume-primary border-b border-resume-border pb-2 mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span 
            key={skill.id} 
            className="px-3 py-1 bg-resume-highlight text-resume-secondary rounded-full text-sm"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
