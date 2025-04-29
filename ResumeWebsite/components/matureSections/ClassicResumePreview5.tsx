
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";
import { Mail, Phone, MapPin } from 'lucide-react';

interface CreateResumePreview2Props {
  resumeData: ResumeData;
}

const CreateResumePreview2: React.FC<CreateResumePreview2Props> = ({
  resumeData
}) => {
  const { personalInfo, education, experience, projects, skills, achievements, certifications, extraSection, extraSectionPosition } = resumeData;

  // Function to render achievements section
  const renderAchievements = () => {
    if (extraSection !== 'achievements' || achievements.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-[#00A8A8] rounded-full"></span>
          <span>Achievements</span>
        </h2>
        {achievements.map((achievement) => (
          <div key={achievement.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div className="text-gray-800 font-medium">{achievement.title}</div>
              <div className="text-sm text-[#00A8A8] whitespace-nowrap">{achievement.date}</div>
            </div>
            <div className="text-sm text-gray-600">{achievement.description}</div>
          </div>
        ))}
      </div>
    );
  };

  // Function to render certifications section
  const renderCertifications = () => {
    if (extraSection !== 'certifications' || certifications.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-[#00A8A8] rounded-full"></span>
          <span>Certifications</span>
        </h2>
        {certifications.map((cert) => (
          <div key={cert.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div className="text-gray-800 font-medium">{cert.name}</div>
              <div className="text-sm text-[#00A8A8] whitespace-nowrap">{cert.date}</div>
            </div>
            <div className="text-sm text-gray-600">{cert.issuer}</div>
            {cert.url && (
              <a 
                href={cert.url} 
                className="text-sm text-[#00A8A8] hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      id="resume-preview" 
      className="w-[210mm] min-h-[297mm] bg-white mx-auto p-12 shadow-lg"
      style={{ 
        transform: 'scale(0.75)',
        transformOrigin: 'top center',
        marginBottom: '-3rem'
      }}
    >
      <div className="flex flex-col h-full">
        {/* Main Content */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-1">{personalInfo.fullName}</h1>
                <p className="text-lg text-[#00A8A8]">{personalInfo.title}</p>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-2">
                  <Mail size={14} className="text-[#00A8A8]" />
                  <span className="text-sm">{personalInfo.email}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Phone size={14} className="text-[#00A8A8]" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <MapPin size={14} className="text-[#00A8A8]" />
                  <span className="text-sm">{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="flex gap-8">
            {/* Left Column */}
            <div className="flex-1">
              {/* Summary Section */}
              {personalInfo.summary && (
                <div className="mb-8">
                  <div className="bg-[#E8F6F1] p-6 text-gray-700 leading-relaxed rounded">
                    {personalInfo.summary}
                  </div>
                </div>
              )}

              {/* Education Section */}
              <div className="mb-8">
                <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#00A8A8] rounded-full"></span>
                  <span>Education</span>
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-gray-800 font-medium">{edu.institution}</div>
                        <div className="text-sm">{edu.degree}</div>
                        <div className="text-sm text-gray-600">{edu.location}</div>
                      </div>
                      <div className="text-sm text-[#00A8A8] whitespace-nowrap">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                    {edu.gpa && <div className="text-sm text-gray-600">GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </div>

              {/* Experience Section */}
              <div className="mb-8">
                <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#00A8A8] rounded-full"></span>
                  <span>Experience</span>
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-gray-800 font-medium">{exp.position}</div>
                        <div className="text-[#00A8A8]">{exp.company}</div>
                        <div className="text-sm text-gray-600">{exp.location}</div>
                      </div>
                      <div className="text-sm text-[#00A8A8] whitespace-nowrap">
                        {exp.startDate} - {exp.endDate}
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
                <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#00A8A8] rounded-full"></span>
                  <span>Projects</span>
                </h2>
                {projects.map((project) => (
                  <div key={project.id} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-gray-800 font-medium">{project.title}</div>
                        <div className="text-sm text-[#00A8A8]">{project.technologies}</div>
                      </div>
                      <div className="text-sm text-[#00A8A8] whitespace-nowrap">
                        {project.startDate} - {project.endDate}
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

              {/* Render Additional Sections in the main column if position is set to 'bottom' */}
              {extraSectionPosition === 'bottom' && extraSection === 'achievements' && renderAchievements()}
              {extraSectionPosition === 'bottom' && extraSection === 'certifications' && renderCertifications()}
            </div>

            {/* Right Column - Skills and potentially additional sections */}
            <div className="w-1/3">
              <div className="mb-8">
                <h2 className="text-lg font-medium flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-[#00A8A8] rounded-full"></span>
                  <span>Skills</span>
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-[#E8F6F1] px-3 py-2 rounded text-sm text-gray-700"
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Render Additional Sections in the sidebar if position is set to 'sidebar' */}
              {extraSectionPosition === 'sidebar' && extraSection === 'achievements' && renderAchievements()}
              {extraSectionPosition === 'sidebar' && extraSection === 'certifications' && renderCertifications()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResumePreview2;