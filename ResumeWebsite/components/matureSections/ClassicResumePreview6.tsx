
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";
import ExtraSection from '../rawSections/sections_1/ExtraSection';


interface CustomResumePreview3Props {
  resumeData: ResumeData;
}

const ClassicResumePreview6: React.FC<CustomResumePreview3Props> = ({
  resumeData
}) => {
  const { personalInfo, education, experience, skills, certifications, achievements, extraSection, extraSectionPosition } = resumeData;

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
      <div className="flex">
        {/* Left Column - Dark Background */}
        <div className="w-1/3 bg-[#672436] text-white p-6 min-h-[297mm]">
          <div className="mb-8">
            <h1 className="text-2xl font-normal mb-2">{personalInfo.fullName}</h1>
            <p className="text-[#E87D95] text-lg">{personalInfo.title}</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 mb-8">
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <span>📞</span>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <span>✉️</span>
              <span className="break-all">{personalInfo.email}</span>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <span>🔗</span>
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <span>🌐</span>
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>

          {/* Summary Section */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-[#E87D95] text-lg mb-3 border-b border-[#E87D95] pb-1">Summary</h2>
              <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Key Strengths Section */}
          <div className="mb-8">
            <h2 className="text-[#E87D95] text-lg mb-3 border-b border-[#E87D95] pb-1">Key Skills</h2>
            <div className="space-y-3">
              {skills.slice(0, 4).map((skill) => (
                <div key={skill.id} className="text-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section with tags */}
          <div className="mb-8">
            <h2 className="text-[#E87D95] text-lg mb-3 border-b border-[#E87D95] pb-1">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-[#85304A] px-3 py-1 rounded-sm text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Extra Section in Sidebar */}
          {extraSectionPosition === 'sidebar' && extraSection !== 'none' && (
            <div className="mb-8">
              <ExtraSection
                achievements={achievements}
                certifications={certifications}
                extraSection={extraSection}
                sectionHeadingClass="text-[#E87D95] text-lg mb-3 border-b border-[#E87D95] pb-1"
                sectionSpacing="mb-8"
              />
            </div>
          )}
        </div>

        {/* Right Column - White Background */}
        <div className="w-2/3 bg-white p-6">
          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-[#672436] text-lg font-normal mb-4 border-b border-[#672436] pb-1">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="font-medium">{edu.institution}</h3>
                <p className="text-sm">{edu.degree}{edu.gpa ? `, GPA: ${edu.gpa}` : ''}</p>
                <div className="flex justify-between text-sm text-[#672436] italic mt-1">
                  <span>{edu.location}</span>
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-[#672436] text-lg font-normal mb-4 border-b border-[#672436] pb-1">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="mb-2">
                  <h3 className="font-medium">{exp.company}</h3>
                  <p className="text-sm">{exp.position}</p>
                  <div className="flex justify-between text-sm text-[#672436] italic">
                    <span>{exp.location}</span>
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                </div>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {exp.descriptions.map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h2 className="text-[#672436] text-lg font-normal mb-4 border-b border-[#672436] pb-1">Projects</h2>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="mb-6">
                <div className="mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm italic">{project.technologies}</p>
                  <div className="text-xs text-[#672436] italic">
                    <span>{project.startDate} - {project.endDate}</span>
                  </div>
                </div>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {project.descriptions.map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Extra Section at Bottom */}
          {extraSectionPosition === 'bottom' && extraSection !== 'none' && (
            <div className="mb-8">
              <ExtraSection
                achievements={achievements}
                certifications={certifications}
                extraSection={extraSection}
                sectionHeadingClass="text-[#672436] text-lg font-normal mb-4 border-b border-[#672436] pb-1"
                sectionSpacing="mb-8"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicResumePreview6;