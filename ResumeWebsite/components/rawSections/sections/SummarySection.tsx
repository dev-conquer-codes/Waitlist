
import React from 'react';

interface SummarySectionProps {
  summary?: string;
  sectionHeadingClass?: string;
  sectionSpacing?: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ 
  summary,
  sectionHeadingClass,
  sectionSpacing
}) => {
  if (!summary) return null;
  
  return (
    <div className={sectionSpacing}>
      <h2 className={sectionHeadingClass}>Summary</h2>
      <p className="text-gray-600 leading-relaxed">{summary}</p>
    </div>
  );
};

export default SummarySection;
