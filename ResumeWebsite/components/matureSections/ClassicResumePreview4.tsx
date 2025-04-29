
import React from 'react';
import { ResumeData } from "@/ResumeWebsite//types/resume";

interface ClassicResumePreviewProps {
  resumeData: ResumeData;
}

const ClassicResumePreview: React.FC<ClassicResumePreviewProps> = ({
  resumeData
}) => {
  const { personalInfo, education, experience, projects, skills, achievements, certifications, extraSection, extraSectionPosition } = resumeData;

  const renderHeader = () => (
    <div className="mb-8">
      <h1 className="text-[#0B4D9B] text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
      <p className="text-gray-700 text-lg mb-3">{personalInfo.title}</p>
      <div className="flex flex-wrap gap-4 text-sm">
        {personalInfo.email && (
          <div className="flex items-center">
            <span className="mr-1">📧</span>
            <a href={`mailto:${personalInfo.email}`} className="text-black hover:underline">
              {personalInfo.email}
            </a>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center">
            <span className="mr-1">📞</span>
            <span>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.location && (
          <div className="flex items-center">
            <span className="mr-1">📍</span>
            <span>{personalInfo.location}</span>
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center">
            <span className="mr-1">🔗</span>
            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
               className="text-black hover:underline" 
               target="_blank" 
               rel="noopener noreferrer">
              {personalInfo.linkedin}
            </a>
          </div>
        )}
        {personalInfo.website && (
          <div className="flex items-center">
            <span className="mr-1">🌐</span>
            <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
               className="text-black hover:underline" 
               target="_blank" 
               rel="noopener noreferrer">
              {personalInfo.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const renderSummary = () => {
    if (!personalInfo.summary) return null;
    return (
      <section className="mb-6">
        <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Summary</h2>
        <p className="text-sm leading-6">{personalInfo.summary}</p>
      </section>
    );
  };

  const renderEducation = () => (
    <section className="mb-6">
      <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Education</h2>
      {education.map((edu) => (
        <div key={edu.id} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold">{edu.institution}</div>
              <div>{edu.degree}</div>
              <div className="text-sm text-gray-600">{edu.location}</div>
            </div>
            <div className="text-sm">
              {edu.gpa && <div className="text-right font-bold">GPA: {edu.gpa}</div>}
              <div>{edu.startDate} - {edu.endDate}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );

  const renderExperience = () => (
    <section className="mb-6">
      <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Experience</h2>
      {experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="font-bold">{exp.position}</div>
              <div className="text-gray-700">{exp.company}</div>
              <div className="text-sm text-gray-600">{exp.location}</div>
            </div>
            <div className="text-sm">{exp.startDate} - {exp.endDate}</div>
          </div>
          <ul className="list-disc ml-4 text-sm space-y-1 mt-2">
            {exp.descriptions.map((desc, index) => (
              <li key={index} className="text-gray-700">{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );

  const renderSkills = () => (
    <section className="mb-6">
      <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );

  const renderProjects = () => (
    <section className="mb-6">
      <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Projects</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="font-bold">{project.title}</div>
              <div className="text-sm text-gray-600 italic">{project.technologies}</div>
            </div>
            <div className="text-sm">{project.startDate} - {project.endDate}</div>
          </div>
          <ul className="list-disc ml-4 text-sm space-y-1 mt-2">
            {project.descriptions.map((desc, index) => (
              <li key={index} className="text-gray-700">{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );

  const renderAchievements = () => {
    if (extraSection !== 'achievements' || achievements.length === 0) return null;
    
    return (
      <section className="mb-6">
        <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Achievements</h2>
        {achievements.map((achievement) => (
          <div key={achievement.id} className="mb-3">
            <div className="flex justify-between items-baseline mb-1">
              <div className="font-bold">{achievement.title}</div>
              <div className="text-sm">{achievement.date}</div>
            </div>
            <p className="text-sm text-gray-700">{achievement.description}</p>
          </div>
        ))}
      </section>
    );
  };

  const renderCertifications = () => {
    if (extraSection !== 'certifications' || certifications.length === 0) return null;
    
    return (
      <section className="mb-6">
        <h2 className="text-[#0B4D9B] font-bold text-lg border-b border-[#0B4D9B] mb-3">Certifications</h2>
        {certifications.map((cert) => (
          <div key={cert.id} className="mb-3">
            <div className="flex justify-between items-baseline mb-1">
              <div className="font-bold">{cert.name}</div>
              <div className="text-sm">{cert.date}</div>
            </div>
            <div className="text-sm text-gray-700">{cert.issuer}</div>
            {cert.url && (
              <a href={cert.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            )}
          </div>
        ))}
      </section>
    );
  };

  // Determine where to render the extra section based on the position
  const renderExtraSection = () => {
    if (extraSection === 'achievements') {
      return renderAchievements();
    } else if (extraSection === 'certifications') {
      return renderCertifications();
    }
    return null;
  };

  return (
    <div 
      id="resume-preview" 
      className="w-[210mm] min-h-[297mm] bg-white mx-auto p-8 shadow-lg"
      style={{ 
        transform: 'scale(0.75)',
        transformOrigin: 'top center',
        marginBottom: '-3rem'
      }}
    >
      {renderHeader()}
      {renderSummary()}
      {renderEducation()}
      {renderExperience()}
      {renderProjects()}
      {renderSkills()}
      
      {/* Render the extra section if the position is 'bottom' */}
      {extraSectionPosition === 'bottom' && renderExtraSection()}
      
      {/* If position is 'sidebar', we'll still render it at the bottom for the classic template 
           since it doesn't have a sidebar layout */}
      {extraSectionPosition === 'sidebar' && renderExtraSection()}
    </div>
  );
};

export default ClassicResumePreview;