
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
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-6">
          <div className="mb-1">
            <h3 className="text-base font-semibold">{project.title}</h3>
            <div className="text-sm text-gray-600 flex justify-between items-baseline">
              <span className="italic">{project.technologies}</span>
              <span>{project.startDate} – {project.endDate}</span>
            </div>
          </div>
          <ul className="mt-2 space-y-1">
            {project.descriptions.map((desc, i) => (
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

export default ProjectsSection;
