
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Certification } from '@/ResumeWebsite/types/resume';
import { v4 as uuidv4 } from 'uuid';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

const CertificationsForm = ({ certifications, onChange }: CertificationsFormProps) => {
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (!name || !issuer || !date) return;
    
    const newCertification: Certification = {
      id: uuidv4(),
      name,
      issuer,
      date,
      url: url || undefined
    };
    
    onChange([...certifications, newCertification]);
    setName('');
    setIssuer('');
    setDate('');
    setUrl('');
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Certification Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Issuing Organization"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Date (e.g., Jan 2024)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          placeholder="Certificate URL (optional)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="button" onClick={handleAdd} className="w-full">
          Add Certification
        </Button>
      </div>

      <div className="space-y-2">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <p className="font-medium">{cert.name}</p>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
              <p className="text-sm text-gray-500">{cert.date}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(cert.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsForm;
