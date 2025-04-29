
import React from 'react';
import { Achievement, Certification } from '@/ResumeWebsite/types/resume2'

interface ExtraSectionProps {
  achievements: Achievement[];
  certifications: Certification[];
  extraSection: "achievements" | "certifications" | "none";
  sectionHeadingClass: string;
  sectionSpacing: string;
}

const ExtraSection: React.FC<ExtraSectionProps> = ({
  achievements,
  certifications,
  extraSection,
  sectionHeadingClass,
  sectionSpacing,
}) => {
  if (extraSection === 'achievements') {
    const limitedAchievements = achievements.slice(0, 2);
    return (
      <div className={sectionSpacing}>
        <h2 className={sectionHeadingClass}>ACHIEVEMENTS</h2>
        {limitedAchievements.map((achievement) => (
          <div key={achievement.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-base">{achievement.title}</h3>
              <span className="text-sm">{achievement.date}</span>
            </div>
            <p className="text-sm">{achievement.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (extraSection === 'certifications') {
    const limitedCertifications = certifications.slice(0, 2);
    return (
      <div className={sectionSpacing}>
        <h2 className={sectionHeadingClass}>CERTIFICATIONS</h2>
        {limitedCertifications.map((cert) => (
          <div key={cert.id} className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-base">{cert.name}</h3>
              <span className="text-sm">{cert.date}</span>
            </div>
            <p className="text-sm italic">{cert.issuer}</p>
            {cert.url && (
              <a href={cert.url} className="text-sm text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ExtraSection;
