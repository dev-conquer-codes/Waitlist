
import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume2";

interface ModernResumePreviewProps {
  resumeData: ResumeData;
}

const ModernResumePreview: React.FC<ModernResumePreviewProps> = ({
  resumeData
}) => {
  const { personalInfo, education, experience, projects, skills, extraSection, extraSectionPosition, achievements, certifications } = resumeData;

  return (
    <div id="resume-preview" className="w-[210mm] h-[297mm] bg-white mx-auto shadow-lg overflow-hidden">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-xl opacity-90 mb-4">{personalInfo.title}</p>
          
          {/* Contact Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{personalInfo.location}</span>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 11-5.656 5.656l-1.102-1.101" />
                </svg>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white opacity-10 rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-white opacity-10 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="p-8 grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-100">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-indigo-600 mb-2">{exp.company} • {exp.location}</p>
                <ul className="list-disc ml-4 text-gray-700 space-y-1">
                  {exp.descriptions.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-100">Projects</h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                  <span className="text-sm text-gray-600">{project.startDate} - {project.endDate}</span>
                </div>
                <p className="text-indigo-600 mb-2">{project.technologies}</p>
                <ul className="list-disc ml-4 text-gray-700 space-y-1">
                  {project.descriptions.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-100">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{edu.institution}</h3>
                <p className="text-indigo-600">{edu.degree}</p>
                <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </section>

          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-100">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          {/* Extra Section (Achievements/Certifications) */}
          {extraSection !== 'none' && extraSectionPosition === 'sidebar' && (
            <section>
              <h2 className="text-2xl font-bold text-indigo-600 mb-4 pb-2 border-b-2 border-indigo-100">
                {extraSection === 'achievements' ? 'Achievements' : 'Certifications'}
              </h2>
              {extraSection === 'achievements' && (
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                      <p className="text-indigo-600 text-sm">{achievement.date}</p>
                    </div>
                  ))}
                </div>
              )}
              {extraSection === 'certifications' && (
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                      <p className="text-indigo-600 text-sm">{cert.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernResumePreview;
