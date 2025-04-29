
import React from 'react';

interface SummarySectionProps {
  summary?: string;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary }) => {
  if (!summary) return null;
  
  return (
    <div className="mb-8">
      <h2 className="text-[#0F52BA] font-bold text-lg mb-4 uppercase border-b border-white pb-1">SUMMARY</h2>
      <p className="text-sm leading-relaxed">{summary}</p>
    </div>
  );
};

export default SummarySection;
