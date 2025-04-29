import React from 'react';
import { ResumeData } from '@/ResumeWebsite/types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const { personalInfo, education, experience, projects, skills, type } = resumeData;

  // Define the order of sections based on resume type
  const sectionOrder = type === 'experienced'
    ? [
        () => renderExperience(),
        () => renderEducation(),
        () => renderProjects(),
        () => renderSkills(),
      ]
    : [
        () => renderEducation(),
        () => renderProjects(),
        () => renderExperience(),
        () => renderSkills(),
      ];

  const renderHeader = () => (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-resume-primary">{personalInfo.fullName}</h1>
      <p className="text-resume-accent font-medium">{personalInfo.title}</p>
      
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-resume-gray">
        <div>{personalInfo.location}</div>
        <div>{personalInfo.phone}</div>
        <div>{personalInfo.email}</div>
        {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        {personalInfo.website && <div>{personalInfo.website}</div>}
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-resume-primary border-b border-resume-gray pb-1 mb-2">Education</h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-2">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold">{edu.degree}</span>
              <span className="mx-1">•</span>
              <span>{edu.institution}</span>
            </div>
            <div className="text-sm flex items-center">
              {edu.startDate} - {edu.endDate}
              {edu.gpa && (
                <span className="ml-2 text-resume-gray">
                  (GPA: {edu.gpa})
                </span>
              )}
            </div>
          </div>
          <div className="text-sm flex justify-between">
            <span>{edu.location}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderExperience = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-resume-primary border-b border-resume-gray pb-1 mb-2">Work Experience</h2>
      {experience.map((exp) => (
        <div key={exp.id} className="mb-3">
          <div className="flex justify-between">
            <div>
              <span className="font-semibold">{exp.position}</span>
              <span className="mx-1">•</span>
              <span>{exp.company}</span>
            </div>
            <div className="text-sm">
              {exp.startDate} - {exp.endDate}
            </div>
          </div>
          <div className="text-sm mb-1">{exp.location}</div>
          <ul className="list-disc ml-4 text-sm">
            {exp.descriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-resume-primary border-b border-resume-gray pb-1 mb-2">Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-3">
          <div className="flex justify-between">
            <div className="font-semibold">{project.title}</div>
            <div className="text-sm">
              {project.startDate} - {project.endDate}
            </div>
          </div>
          <div className="text-sm mb-1">Technologies: {project.technologies}</div>
          <ul className="list-disc ml-4 text-sm">
            {project.descriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div>
      <h2 className="text-lg font-bold text-resume-primary border-b border-resume-gray pb-1 mb-2">Skills</h2>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {skills.map((skill) => (
          <span key={skill.id} className="bg-resume-light text-resume-gray px-2 py-0.5 rounded text-sm">
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div 
      id="resume-preview" 
      className="w-[210mm] h-[297mm] bg-white p-8 shadow-lg mx-auto overflow-hidden"
      style={{ 
        transform: 'scale(0.7)',
        transformOrigin: 'top center', 
        marginTop: '-4rem',
        marginBottom: '-4rem'
      }}
    >
      {renderHeader()}
      {sectionOrder.map((renderSection, index) => (
        <React.Fragment key={index}>
          {renderSection()}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ResumePreview;
