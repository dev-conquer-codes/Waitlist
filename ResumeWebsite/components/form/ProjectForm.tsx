
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project, MAX_DESCRIPTION_LENGTH, MAX_PROJECTS } from "../types/resume";
import { Plus, X } from "lucide-react";
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface ProjectFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectForm = ({ projects, onChange }: ProjectFormProps) => {
  const [newDescription, setNewDescription] = useState('');
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'descriptions'>>({
    title: '',
    technologies: '',
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

  const handleAddProject = () => {
    if (!newProject.title || !newProject.technologies || !descriptions.length) {
      return;
    }

    if (projects.length >= MAX_PROJECTS) {
      return;
    }

    const id = `proj-${Date.now()}`;
    onChange([...projects, { ...newProject, id, descriptions }]);
    
    // Reset the form
    setNewProject({
      title: '',
      technologies: '',
      startDate: '',
      endDate: '',
    });
    setDescriptions([]);
    setNewDescription('');
  };

  const handleRemoveProject = (id: string) => {
    onChange(projects.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-6">
      {projects.length >= MAX_PROJECTS && (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200">
          <AlertDescription>
            You've reached the maximum limit of {MAX_PROJECTS} projects to maintain a one-page resume.
          </AlertDescription>
        </Alert>
      )}

      {projects.map((project) => (
        <Card key={project.id} className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={() => handleRemoveProject(project.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <div className="font-medium">{project.title}</div>
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <div>{project.technologies}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <div>{project.startDate}</div>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <div>{project.endDate}</div>
              </div>
            </div>
            <div className="mt-4">
              <Label>Descriptions</Label>
              <ul className="list-disc ml-5 mt-2">
                {project.descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}

      {projects.length < MAX_PROJECTS && (
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">Add Project</h3>
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Personal Portfolio Website"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies *</Label>
            <Input
              id="technologies"
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              placeholder="React, Tailwind CSS, TypeScript"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                placeholder="Dec 2020"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                value={newProject.endDate}
                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                placeholder="Jan 2021 or Present"
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
                  placeholder="Built a responsive portfolio website showcasing projects and skills"
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
            onClick={handleAddProject}
            className="mt-2"
            disabled={!newProject.title || !newProject.technologies || descriptions.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
