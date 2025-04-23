import { PersonalInfo } from '@/ResumeWebsite/types/resume';
import React from 'react';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}
const ContactSection: React.FC<ContactSectionProps> = ({
  personalInfo
}) => {
  return <div className="mb-8">
      <h2 className="text-[#0F52BA] font-bold text-lg mb-4 uppercase border-b border-white pb-1">CONTACT</h2>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="text-sm mr-2 flex-shrink-0">•</span>
          <span className="text-sm break-words">{personalInfo.location || "City, Country"}</span>
        </li>
        <li className="flex items-start">
          <span className="text-sm mr-2 flex-shrink-0">•</span>
          <a href={`tel:${personalInfo.phone || "+44 1234567890"}`} className="text-sm text-black hover:underline break-words">
            {personalInfo.phone || "+44 1234567890"}
          </a>
        </li>
        <li className="flex items-start">
          <span className="text-sm mr-2 flex-shrink-0">•</span>
          <a href={`mailto:${personalInfo.email || "email@example.com"}`} className="text-sm text-black hover:underline break-words">
            {personalInfo.email || "email@example.com"}
          </a>
        </li>
        {personalInfo.website && <li className="flex items-start">
            <span className="text-sm mr-2 flex-shrink-0">•</span>
            <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-black hover:underline break-words">
              {personalInfo.website}
            </a>
          </li>}
        {personalInfo.linkedin && <li className="flex items-start">
            <span className="text-sm mr-2 flex-shrink-0">•</span>
            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-black hover:underline break-words">
              {personalInfo.linkedin}
            </a>
          </li>}
      </ul>
    </div>;
};
export default ContactSection;