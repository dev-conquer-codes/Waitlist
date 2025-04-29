
import React from 'react';

interface SummarySectionProps {
  summary?: string;
  sectionHeadingClass?: string;
  sectionSpacing?: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ 
  summary,
  sectionHeadingClass = "text-[#0F52BA] font-bold text-lg mb-4 uppercase border-b border-white pb-1",
  sectionSpacing = "mb-8"
}) => {
  if (!summary) return null;
  
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>SUMMARY</h2>
      <p className="text-sm leading-relaxed">{summary}</p>
    </div>
  );
};

export default SummarySection;
