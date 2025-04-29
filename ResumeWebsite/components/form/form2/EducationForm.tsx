
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, X } from "lucide-react";
import { Card, CardContent } from '../../ui/card';
import { Education } from '@/ResumeWebsite/types/resume2';


interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationForm = ({ education, onChange }: EducationFormProps) => {
  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const handleAddEducation = () => {
    if (!newEducation.degree || !newEducation.institution || !newEducation.startDate || !newEducation.endDate) {
      return;
    }

    const id = `edu-${Date.now()}`;
    onChange([...education, { ...newEducation, id }]);
    
    // Reset the form
    setNewEducation({
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    });
  };

  const handleRemoveEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      {education.map((edu) => (
        <Card key={edu.id} className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={() => handleRemoveEducation(edu.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree/Certificate</Label>
                <div className="font-medium">{edu.degree}</div>
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <div className="font-medium">{edu.institution}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <div>{edu.location}</div>
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div>{edu.startDate} - {edu.endDate}</div>
              </div>
              <div className="space-y-2">
                <Label>GPA (Optional)</Label>
                <div>{edu.gpa || 'N/A'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="space-y-4 border rounded-lg p-4">
        <h3 className="font-medium">Add Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree/Certificate *</Label>
            <Input
              id="degree"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              placeholder="Bachelor of Science in Computer Science"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="institution">Institution *</Label>
            <Input
              id="institution"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
              placeholder="University of Example"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={newEducation.location}
              onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
              placeholder="City, State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              value={newEducation.startDate}
              onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              placeholder="2016"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              value={newEducation.endDate}
              onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
              placeholder="2020 or Present"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gpa">GPA (Optional)</Label>
          <Input
            id="gpa"
            value={newEducation.gpa || ''}
            onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
            placeholder="3.8/4.0"
          />
        </div>

        <Button 
          type="button" 
          onClick={handleAddEducation}
          className="mt-2"
          disabled={!newEducation.degree || !newEducation.institution || !newEducation.startDate || !newEducation.endDate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>
    </div>
  );
};

export default EducationForm;
