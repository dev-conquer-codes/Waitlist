import React from 'react';
import { ResumeData } from "@/ResumeWebsite/types/resume";
import { Mail, Phone, MapPin } from 'lucide-react';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';

interface CustomResumePreview8Props {
  resumeData: ResumeData;
}

const ClassicResumePreview8: React.FC<CustomResumePreview8Props> = ({
  resumeData
}) => {
  const { personalInfo, education, experience, projects, skills, achievements, certifications } = resumeData;

  return (
    <div 
      id="resume-preview" 
      className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-lg overflow-hidden"
      style={{ 
        transform: 'scale(0.75)',
        transformOrigin: 'top center',
        marginBottom: '-3rem'
      }}
    >
      {/* Header Section with Background */}
      <div className="relative bg-[#2C2C2C] text-white p-8 pb-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
            <h2 className="text-xl mb-4">{personalInfo.title}</h2>
            <p className="text-sm leading-relaxed max-w-2xl opacity-90">
              {personalInfo.summary}
            </p>
          </div>
          {/* Profile Image Placeholder - Right aligned */}
          {/* <div className="w-32 h-32 rounded-lg overflow-hidden ml-6">
            <div className="w-full h-full bg-gray-300"></div>
          </div> */}
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-[#C0C0C0] text-white px-8 py-3 flex justify-start gap-8">
        <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-80">
          <Mail size={16} />
          <span>{personalInfo.email}</span>
        </a>
      
        <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:opacity-80">
          <Phone size={16} />
          <span>{personalInfo.phone}</span>
        </a>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Education Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#800020] flex items-center justify-center">
              <span className="text-white text-lg">E</span>
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E50]">Education</h2>
          </div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 ml-11">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{edu.institution}</h3>
                  <p>{edu.degree}</p>
                  <p className="text-gray-600">{edu.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#800020]">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#800020] flex items-center justify-center">
              <span className="text-white text-lg">W</span>
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E50]">Experience</h2>
          </div>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6 ml-11">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-[#2C3E50]">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-gray-600">{exp.location}</p>
                </div>
                <p className="text-[#800020]">{exp.startDate} - {exp.endDate}</p>
              </div>
              <ul className="list-disc ml-4 space-y-1">
                {exp.descriptions.map((desc, index) => (
                  <li key={index} className="text-gray-700">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#800020] flex items-center justify-center">
              <span className="text-white text-lg">S</span>
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E50]">Skills</h2>
          </div>
          <div className="ml-11 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicResumePreview8;