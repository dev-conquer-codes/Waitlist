
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Experience, MAX_DESCRIPTION_LENGTH, MAX_EXPERIENCES } from "../../types/resume";
import { Plus, X } from "lucide-react";
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

interface ExperienceFormProps {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

const ExperienceForm = ({ experience, onChange }: ExperienceFormProps) => {
  const [newDescription, setNewDescription] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id' | 'descriptions'>>({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
  });

  const handleAddDescription = () => {
    if (!newDescription || descriptions.length >= 4) return;
    
    setDescriptions([...descriptions, newDescription]);
    setNewDescription('');
  };

  const handleRemoveDescription = (index: number) => {
    const newDescriptions = [...descriptions];
    newDescriptions.splice(index, 1);
    setDescriptions(newDescriptions);
  };

  const handleAddExperience = () => {
    if (!newExperience.position || !newExperience.company || !descriptions.length) {
      return;
    }

    if (experience.length >= MAX_EXPERIENCES) {
      return;
    }

    const id = `exp-${Date.now()}`;
    onChange([...experience, { ...newExperience, id, descriptions }]);
    
    // Reset the form
    setNewExperience({
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
    });
    setDescriptions([]);
    setNewDescription('');
  };

  const handleRemoveExperience = (id: string) => {
    onChange(experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      {experience.length >= MAX_EXPERIENCES && (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200">
          <AlertDescription>
            You've reached the maximum limit of {MAX_EXPERIENCES} experiences to maintain a one-page resume.
          </AlertDescription>
        </Alert>
      )}

      {experience.map((exp) => (
        <Card key={exp.id} className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={() => handleRemoveExperience(exp.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <div className="font-medium">{exp.position}</div>
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <div className="font-medium">{exp.company}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <div>{exp.location}</div>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <div>{exp.startDate}</div>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <div>{exp.endDate}</div>
              </div>
            </div>
            <div className="mt-4">
              <Label>Descriptions</Label>
              <ul className="list-disc ml-5 mt-2">
                {exp.descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}

      {experience.length < MAX_EXPERIENCES && (
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">Add Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                placeholder="Software Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="Tech Company"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                placeholder="Jan 2021"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                placeholder="Present"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptions">Descriptions *</Label>
            {descriptions.map((desc, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div className="bg-gray-50 p-2 rounded flex-1">{desc}</div>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDescription(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            {descriptions.length < 4 && (
              <div className="flex gap-2">
                <Textarea
                  id="descriptions"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Developed and maintained web applications using React and Node.js"
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleAddDescription}
                  disabled={!newDescription}
                  className="self-end"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-1">
              {newDescription.length}/{MAX_DESCRIPTION_LENGTH} characters • {descriptions.length}/4 bullet points
            </p>
          </div>

          <Button 
            type="button" 
            onClick={handleAddExperience}
            className="mt-2"
            disabled={!newExperience.position || !newExperience.company || descriptions.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
