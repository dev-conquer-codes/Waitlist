import { ResumeData } from "../types/resume";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  return (
    <div className="w-[210mm] h-[297mm] text-black font-sans overflow-hidden p-[20mm] text-[11px] leading-[1.6] bg-white">
      {/* Header Section */}
      <header className="flex items-center gap-6 px-6 py-4 bg-[#E6EBF0]  ">
        <div className="mt-10">
          <h1 className="text-4xl font-bold text-gray-700 tracking-wide">
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </h1>
          <h2 className="text-xl text-gray-600 mt-1">{resumeData.personalInfo.jobTitle}</h2>
        </div>
      </header>

      <div className="flex h-[calc(100%-100px)]">
        {/* Sidebar */}
        <aside className="w-1/3 bg-[#E6EBF0] p-4 flex flex-col gap-6">
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="h-4 w-4" />
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Globe className="h-4 w-4" />
              <span>{resumeData.personalInfo.website}</span>
            </div>
          </div>

          {/* Education */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">EDUCATION</h3>
            {resumeData.education.map((education) => (
              <div key={education.id} className="mb-3">
                <h4 className="font-semibold text-gray-800">{education.degree}</h4>
                <p className="text-gray-700">{education.field}</p>
                <p className="text-gray-600">{education.school}</p>
                <p className="text-gray-500 text-sm">
                  {education.startDate} - {education.endDate}
                </p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">SKILLS</h3>
            <ul className="space-y-1 text-gray-700">
              {resumeData.skills.technical.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
              {resumeData.skills.professional.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">LANGUAGE</h3>
            <ul className="space-y-1 text-gray-700">
              {resumeData.languages.map((language, index) => (
                <li key={index}>{language.name}</li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-6 flex flex-col gap-6 overflow-y-auto">
          {/* About Me */}
          <section>
            <h3 className="text-lg font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">About Me</h3>
            <p className="text-gray-700">{resumeData.summary}</p>
          </section>

          {/* Work Experience */}
          <section>
            <h3 className="text-lg font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">WORK EXPERIENCE</h3>
            {resumeData.workExperience.map((experience) => (
              <div key={experience.id} className="mb-4">
                <p className="text-gray-500">{experience.startDate} - {experience.endDate}</p>
                <h4 className="font-semibold text-gray-800">{experience.company}</h4>
                <p className="text-gray-700">{experience.title}</p>
                <ul className="list-disc list-inside ml-4 text-gray-600 space-y-1">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* References (Projects) */}
          <section className="">
            <h3 className="text-lg font-bold mb-2 text-gray-800 border-b border-gray-300 pb-1">REFERENCES</h3>
            <div className="grid grid-cols-2 gap-4">
              {resumeData.projects.map((project) => (
                <div key={project.id} className="text-sm">
                  <p className="font-semibold text-gray-800">{project.name}</p>
                  <p className="text-gray-600">{project.description}</p>
                  {project.link && (
                    <p className="text-gray-500">
                      Email: {project.link}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResumePreview;
