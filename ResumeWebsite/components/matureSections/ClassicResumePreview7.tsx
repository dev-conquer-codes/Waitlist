
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";

interface ClassicResumePreview7Props {
  resumeData: ResumeData;
}

const ClassicResumePreview7: React.FC<ClassicResumePreview7Props> = ({
  resumeData
}) => {
  const { personalInfo, education, experience, skills, achievements, extraSection, projects, certifications } = resumeData;

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
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-right mb-4">{personalInfo.fullName}</h1>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>📞</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>✉️</span>
              <span>{personalInfo.email}</span>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <span>🔗</span>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <span>🌐</span>
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Summary</h2>
          <p className="text-sm leading-6">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Education</h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-4 relative pl-6">
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-[#009688]"></div>
            <div className="font-bold">{edu.institution}</div>
            <div>{edu.degree}{edu.gpa ? `, CGPA: ${edu.gpa}` : ''}</div>
            <div className="text-sm italic text-[#009688]">{edu.location}</div>
            <div className="text-sm text-right text-[#009688]">{edu.startDate} - {edu.endDate}</div>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-6 relative pl-6">
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-[#009688]"></div>
            <div className="font-bold">{exp.company}</div>
            <div>{exp.position}</div>
            <div className="text-sm italic text-[#009688]">{exp.location}</div>
            <div className="text-sm text-[#009688] mb-2">{exp.startDate} - {exp.endDate}</div>
            <ul className="list-disc ml-4 text-sm space-y-1">
              {exp.descriptions.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-6 relative pl-6">
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-[#009688]"></div>
              <div className="font-bold">{project.title}</div>
              <div className="text-sm italic text-[#009688]">{project.technologies}</div>
              <div className="text-sm text-[#009688] mb-2">{project.startDate} - {project.endDate}</div>
              <ul className="list-disc ml-4 text-sm space-y-1">
                {project.descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 text-sm border border-[#009688] rounded"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      {extraSection === 'achievements' && achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Awards & Achievements</h2>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{achievement.title}</span>
                <span className="text-[#009688]">{achievement.date}</span>
              </div>
              <p className="text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications Section */}
      {extraSection === 'certifications' && certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold border-b border-[#009688] pb-1 mb-3">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{cert.name}</span>
                <span className="text-[#009688]">{cert.date}</span>
              </div>
              <p className="text-sm">{cert.issuer}</p>
              {cert.url && <a href={cert.url} className="text-sm text-blue-600 hover:underline">{cert.url}</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassicResumePreview7;