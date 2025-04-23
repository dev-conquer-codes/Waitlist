import { ResumeData } from "../types/resume";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  return (
    <div className="w-[210mm] h-[297mm]  text-black font-sans overflow-hidden p-[20mm] text-[11px] leading-[1.6]">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-300 pb-4 mb-4">
        {/* Left Name & Title */}
        <div>
          <p className="uppercase tracking-wide text-sm">
            {resumeData.personalInfo.firstName}
          </p>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide -mt-1">
            {resumeData.personalInfo.lastName}
          </h1>
          <h2 className="text-sm uppercase tracking-widest font-light mt-1">
            {resumeData.personalInfo.jobTitle}
          </h2>
        </div>

        {/* Right Photo + Contact Info */}
        <div className="flex flex-col items-end text-right">
          {/* {resumeData.personalInfo.photoUrl && (
            <img
              src={resumeData.personalInfo.photoUrl}
              alt="Profile"
              className="w-[80px] h-[80px] object-cover rounded-full mb-2"
            />
          )} */}
          <div className="flex items-center gap-1 text-xs mb-1">
            <Phone className="w-3 h-3" />
            <span>{resumeData.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-1 text-xs mb-1">
            <Mail className="w-3 h-3" />
            <span>{resumeData.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-1 text-xs mb-1">
            <Globe className="w-3 h-3" />
            <span>{resumeData.personalInfo.website}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <MapPin className="w-3 h-3" />
            <span>{resumeData.personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex">
        {/* Left Column */}
        <div className="w-2/3 pr-6">
          {/* Summary */}
          <section className="mb-4">
            <h3 className="text-[13px] font-bold uppercase mb-1">Summary</h3>
            <p className="text-[11px] text-gray-800 whitespace-pre-wrap">
              {resumeData.summary}
            </p>
          </section>

          {/* Work Experience */}
          <section className="mb-4">
            <h3 className="text-[13px] font-bold uppercase mb-2">
              Work Experience
            </h3>
            {resumeData.workExperience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <h4 className="text-[12px] font-semibold uppercase">
                  {exp.title}
                </h4>
                <p className="text-[11px] text-gray-800 mb-1">
                  {exp.company} | {exp.startDate} - {exp.endDate}
                </p>
                <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-[13px] font-bold uppercase mb-2">Projects</h3>
            {resumeData.projects.map((project) => (
              <div key={project.id} className="mb-1">
                <span className="font-semibold text-[11px]">
                  {project.name}:
                </span>{" "}
                <span className="text-gray-700 text-[11px]">
                  {project.description}
                </span>
                {project.link && (
                  <span className="text-gray-500 text-[11px]">
                    {" "}
                    [{project.link}]
                  </span>
                )}
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div className="w-1/3 pl-4 border-l border-gray-200">
          {/* Education */}
          <section className="mb-4">
            <h3 className="text-[13px] font-bold uppercase mb-2">Education</h3>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="font-semibold text-[11px]">{edu.degree}</p>
                <p className="text-[11px] text-gray-800">in {edu.field}</p>
                <p className="text-[11px] text-gray-800">{edu.school}</p>
                <p className="text-[11px] text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-4">
            <h3 className="text-[13px] font-bold uppercase mb-2">Skills</h3>
            <h4 className="text-[11px] font-semibold mb-1">Technical</h4>
            <ul className="text-gray-700 mb-2">
              {resumeData.skills.technical.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
            <h4 className="text-[11px] font-semibold mb-1">Professional</h4>
            <ul className="text-gray-700">
              {resumeData.skills.professional.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-[13px] font-bold uppercase mb-2">Languages</h3>
            <ul className="text-gray-700">
              {resumeData.languages.map((lang, i) => (
                <li key={i}>
                  {lang.name}: {lang.proficiency}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
