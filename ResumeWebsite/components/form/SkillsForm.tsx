
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skill, MAX_SKILLS } from "../../types/resume";
import { Plus, X } from "lucide-react";
import { Alert, AlertDescription } from '../ui/alert';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsForm = ({ skills, onChange }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (!newSkill || skills.length >= MAX_SKILLS) return;
    
    const id = `skill-${Date.now()}`;
    onChange([...skills, { id, name: newSkill }]);
    setNewSkill('');
  };

  const handleRemoveSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      {skills.length >= MAX_SKILLS && (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200">
          <AlertDescription>
            You've reached the maximum limit of {MAX_SKILLS} skills to maintain a clean, one-page resume.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1"
          >
            <span>{skill.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full"
              onClick={() => handleRemoveSkill(skill.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {skills.length < MAX_SKILLS && (
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="newSkill">Add Skill</Label>
            <div className="flex gap-2">
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="JavaScript, React, Project Management, etc."
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                type="button"
                onClick={handleAddSkill}
                disabled={!newSkill}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Press Enter to add a skill • {skills.length}/{MAX_SKILLS} skills
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
