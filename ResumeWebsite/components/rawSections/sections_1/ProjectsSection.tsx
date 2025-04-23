
import React from 'react';
import { Project } from "@/ResumeWebsite/types/resume";

interface ProjectsSectionProps {
  projects: Project[];
  sectionHeadingClass: string;
  sectionSpacing: string;
  bulletPointClass: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  sectionHeadingClass,
  sectionSpacing,
  bulletPointClass
}) => {
  const limitedProjects = projects.slice(0, 3);
  
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>PROJECTS</h2>
      {limitedProjects.map((project) => (
        <div key={project.id} className="mb-6">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-bold text-base">{project.title}</h3>
            <span className="text-sm">{project.startDate} – {project.endDate}</span>
          </div>
          <p className="text-sm italic mb-2">{project.technologies}</p>
          <ul className="space-y-2">
            {project.descriptions.map((desc, i) => (
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

export default ProjectsSection;
