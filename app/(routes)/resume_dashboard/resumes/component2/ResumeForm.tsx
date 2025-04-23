import { useState } from "react";
import { ResumeData, RESUME_LIMITS } from "../types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "../hooks/use-toast";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const { toast } = useToast();

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value.length <= RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH) {
      setResumeData({
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          [name]: value,
        },
      });
    }
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= RESUME_LIMITS.SUMMARY_MAX_LENGTH) {
      setResumeData({
        ...resumeData,
        summary: value,
      });
    } else {
      toast({
        title: "Character limit reached",
        description: `Summary is limited to ${RESUME_LIMITS.SUMMARY_MAX_LENGTH} characters for a clean one-page resume.`,
      });
    }
  };

  const handleWorkExperienceChange = (
    id: string,
    field: string,
    value: string
  ) => {
    if (value.length <= RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH) {
      setResumeData({
        ...resumeData,
        workExperience: resumeData.workExperience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      });
    }
  };

  const handleResponsibilityChange = (
    expId: string,
    index: number,
    value: string
  ) => {
    if (value.length <= RESUME_LIMITS.RESPONSIBILITY_MAX_LENGTH) {
      setResumeData({
        ...resumeData,
        workExperience: resumeData.workExperience.map((exp) => {
          if (exp.id === expId) {
            const responsibilities = [...exp.responsibilities];
            responsibilities[index] = value;
            return { ...exp, responsibilities };
          }
          return exp;
        }),
      });
    } else {
      toast({
        title: "Character limit reached",
        description: `Responsibility is limited to ${RESUME_LIMITS.RESPONSIBILITY_MAX_LENGTH} characters for a clean one-page resume.`,
      });
    }
  };

  const addResponsibility = (expId: string) => {
    const experience = resumeData.workExperience.find(exp => exp.id === expId);
    if (experience && experience.responsibilities.length < RESUME_LIMITS.MAX_RESPONSIBILITIES) {
      setResumeData({
        ...resumeData,
        workExperience: resumeData.workExperience.map((exp) => {
          if (exp.id === expId) {
            return {
              ...exp,
              responsibilities: [...exp.responsibilities, ""],
            };
          }
          return exp;
        }),
      });
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${RESUME_LIMITS.MAX_RESPONSIBILITIES} responsibilities per job for a clean one-page resume.`,
      });
    }
  };

  const removeResponsibility = (expId: string, index: number) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map((exp) => {
        if (exp.id === expId) {
          const responsibilities = [...exp.responsibilities];
          responsibilities.splice(index, 1);
          return { ...exp, responsibilities };
        }
        return exp;
      }),
    });
  };

  const addWorkExperience = () => {
    if (resumeData.workExperience.length < RESUME_LIMITS.MAX_WORK_EXPERIENCES) {
      const newId = Date.now().toString();
      setResumeData({
        ...resumeData,
        workExperience: [
          ...resumeData.workExperience,
          {
            id: newId,
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            responsibilities: [""],
          },
        ],
      });
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${RESUME_LIMITS.MAX_WORK_EXPERIENCES} work experiences for a clean one-page resume.`,
      });
    }
  };

  const removeWorkExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const handleEducationChange = (
    id: string,
    field: string,
    value: string
  ) => {
    if (value.length <= RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH) {
      setResumeData({
        ...resumeData,
        education: resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        ),
      });
    }
  };

  const addEducation = () => {
    if (resumeData.education.length < RESUME_LIMITS.MAX_EDUCATION_ENTRIES) {
      const newId = Date.now().toString();
      setResumeData({
        ...resumeData,
        education: [
          ...resumeData.education,
          {
            id: newId,
            degree: "",
            field: "",
            school: "",
            startDate: "",
            endDate: "",
          },
        ],
      });
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${RESUME_LIMITS.MAX_EDUCATION_ENTRIES} education entries for a clean one-page resume.`,
      });
    }
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const handleSkillChange = (
    category: "technical" | "professional",
    index: number,
    value: string
  ) => {
    if (value.length <= RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH) {
      const skills = [...resumeData.skills[category]];
      skills[index] = value;
      setResumeData({
        ...resumeData,
        skills: {
          ...resumeData.skills,
          [category]: skills,
        },
      });
    }
  };

  const addSkill = (category: "technical" | "professional") => {
    const maxSkills = category === "technical" ? 
      RESUME_LIMITS.MAX_TECHNICAL_SKILLS : 
      RESUME_LIMITS.MAX_PROFESSIONAL_SKILLS;
      
    if (resumeData.skills[category].length < maxSkills) {
      setResumeData({
        ...resumeData,
        skills: {
          ...resumeData.skills,
          [category]: [...resumeData.skills[category], ""],
        },
      });
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${maxSkills} ${category} skills for a clean one-page resume.`,
      });
    }
  };

  const removeSkill = (category: "technical" | "professional", index: number) => {
    const skills = [...resumeData.skills[category]];
    skills.splice(index, 1);
    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [category]: skills,
      },
    });
  };

  const handleLanguageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    if (value.length <= RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH) {
      const languages = [...resumeData.languages];
      languages[index] = { ...languages[index], [field]: value };
      setResumeData({
        ...resumeData,
        languages,
      });
    }
  };

  const addLanguage = () => {
    if (resumeData.languages.length < RESUME_LIMITS.MAX_LANGUAGES) {
      setResumeData({
        ...resumeData,
        languages: [...resumeData.languages, { name: "", proficiency: "" }],
      });
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${RESUME_LIMITS.MAX_LANGUAGES} languages for a clean one-page resume.`,
      });
    }
  };

  const removeLanguage = (index: number) => {
    const languages = [...resumeData.languages];
    languages.splice(index, 1);
    setResumeData({
      ...resumeData,
      languages,
    });
  };

  const handleProjectChange = (
    id: string,
    field: string,
    value: string
  ) => {
    const maxLength = field === "description" ? 
      RESUME_LIMITS.PROJECT_DESCRIPTION_MAX_LENGTH : 
      RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH;
      
    if (value.length <= maxLength) {
      setResumeData({
        ...resumeData,
        projects: resumeData.projects.map((project) =>
          project.id === id ? { ...project, [field]: value } : project
        ),
      });
    } else {
      toast({
        title: "Character limit reached",
        description: `Project ${field} is limited to ${maxLength} characters for a clean one-page resume.`,
      });
    }
  };

  const addProject = () => {
    if (resumeData.projects.length < RESUME_LIMITS.MAX_PROJECTS) {
      const newId = Date.now().toString();
      setResumeData({
        ...resumeData,
        projects: [
          ...resumeData.projects,
          {
            id: newId,
            name: "",
            description: "",
            link: "",
          },
        ],
      });
    } else {
      toast({
        title: "Maximum limit reached",
        description: `You can only add up to ${RESUME_LIMITS.MAX_PROJECTS} projects for a clean one-page resume.`,
      });
    }
  };

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter((project) => project.id !== id),
    });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData({
          ...resumeData,
          personalInfo: {
            ...resumeData.personalInfo,
            profileImage: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCharacterCount = (current: number, max: number) => {
    return (
      <div className="text-xs text-right text-gray-500">
        {current}/{max} characters
      </div>
    );
  };

  const LimitInfoTooltip = ({ text }: { text: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-gray-400 cursor-help ml-1" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[200px] text-xs">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Resume Information</h2>
      
      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <h3 className="font-medium text-lg">Personal Information</h3>
              <LimitInfoTooltip text={`All text fields are limited to ${RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH} characters to ensure a clean one-page resume.`} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={resumeData.personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  placeholder="First Name"
                  maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                />
                {renderCharacterCount(resumeData.personalInfo.firstName.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={resumeData.personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  placeholder="Last Name"
                  maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                />
                {renderCharacterCount(resumeData.personalInfo.lastName.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={resumeData.personalInfo.jobTitle}
                onChange={handlePersonalInfoChange}
                placeholder="Job Title"
                maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
              />
              {renderCharacterCount(resumeData.personalInfo.jobTitle.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder="email@example.com"
                maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
              />
              {renderCharacterCount(resumeData.personalInfo.email.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                placeholder="+1 234 567 890"
                maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
              />
              {renderCharacterCount(resumeData.personalInfo.phone.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={resumeData.personalInfo.website}
                onChange={handlePersonalInfoChange}
                placeholder="www.example.com"
                maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
              />
              {renderCharacterCount(resumeData.personalInfo.website.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalInfoChange}
                placeholder="City, Country"
                maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
              />
              {renderCharacterCount(resumeData.personalInfo.location.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="summary">Professional Summary</Label>
              <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.SUMMARY_MAX_LENGTH} characters to ensure a clean one-page resume.`} />
            </div>
            <Textarea
              id="summary"
              value={resumeData.summary}
              onChange={handleSummaryChange}
              placeholder="Write a professional summary..."
              className="min-h-[100px]"
              maxLength={RESUME_LIMITS.SUMMARY_MAX_LENGTH}
            />
            {renderCharacterCount(resumeData.summary.length, RESUME_LIMITS.SUMMARY_MAX_LENGTH)}
          </div>
        </TabsContent>
        
        <TabsContent value="experience" className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-medium text-lg">Work Experience</h3>
                <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_WORK_EXPERIENCES} entries to ensure a clean one-page resume.`} />
              </div>
              <Button variant="outline" size="sm" onClick={addWorkExperience}>
                <PlusCircle className="h-4 w-4 mr-1" /> Add Job
              </Button>
            </div>
            
            <Accordion type="multiple" defaultValue={resumeData.workExperience.map(exp => exp.id)}>
              {resumeData.workExperience.map((experience, expIndex) => (
                <AccordionItem key={experience.id} value={experience.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {experience.title || experience.company 
                        ? `${experience.title} at ${experience.company}` 
                        : `Job Position ${expIndex + 1}`}
                    </AccordionTrigger>
                    {resumeData.workExperience.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeWorkExperience(experience.id)}
                        className="mr-4 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor={`jobTitle-${experience.id}`}>Job Title</Label>
                        <Input
                          id={`jobTitle-${experience.id}`}
                          value={experience.title}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "title", e.target.value)}
                          placeholder="Job Title"
                          maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                        />
                        {renderCharacterCount(experience.title.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`}>Company</Label>
                        <Input
                          id={`company-${experience.id}`}
                          value={experience.company}
                          onChange={(e) => handleWorkExperienceChange(experience.id, "company", e.target.value)}
                          placeholder="Company Name"
                          maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                        />
                        {renderCharacterCount(experience.company.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                          <Input
                            id={`startDate-${experience.id}`}
                            value={experience.startDate}
                            onChange={(e) => handleWorkExperienceChange(experience.id, "startDate", e.target.value)}
                            placeholder="e.g., Jan 2020"
                            maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                          />
                          {renderCharacterCount(experience.startDate.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                          <Input
                            id={`endDate-${experience.id}`}
                            value={experience.endDate}
                            onChange={(e) => handleWorkExperienceChange(experience.id, "endDate", e.target.value)}
                            placeholder="e.g., Present"
                            maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                          />
                          {renderCharacterCount(experience.endDate.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Label>Responsibilities</Label>
                            <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_RESPONSIBILITIES} responsibilities per job with ${RESUME_LIMITS.RESPONSIBILITY_MAX_LENGTH} characters each.`} />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addResponsibility(experience.id)}
                          >
                            <PlusCircle className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                        
                        {experience.responsibilities.map((responsibility, respIndex) => (
                          <div key={respIndex} className="space-y-1">
                            <div className="flex gap-2">
                              <Textarea
                                value={responsibility}
                                onChange={(e) => handleResponsibilityChange(experience.id, respIndex, e.target.value)}
                                placeholder="Describe your responsibility..."
                                className="flex-1"
                                maxLength={RESUME_LIMITS.RESPONSIBILITY_MAX_LENGTH}
                              />
                              {experience.responsibilities.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeResponsibility(experience.id, respIndex)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            {renderCharacterCount(responsibility.length, RESUME_LIMITS.RESPONSIBILITY_MAX_LENGTH)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-medium text-lg">Education</h3>
                <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_EDUCATION_ENTRIES} entries to ensure a clean one-page resume.`} />
              </div>
              <Button variant="outline" size="sm" onClick={addEducation}>
                <PlusCircle className="h-4 w-4 mr-1" /> Add Education
              </Button>
            </div>
            
            <Accordion type="multiple" defaultValue={resumeData.education.map(edu => edu.id)}>
              {resumeData.education.map((education, eduIndex) => (
                <AccordionItem key={education.id} value={education.id}>
                  <div className="flex items-center">
                    <AccordionTrigger className="flex-1">
                      {education.degree || education.school 
                        ? `${education.degree} in ${education.field} at ${education.school}` 
                        : `Education ${eduIndex + 1}`}
                    </AccordionTrigger>
                    {resumeData.education.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeEducation(education.id)}
                        className="mr-4 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                        <Input
                          id={`degree-${education.id}`}
                          value={education.degree}
                          onChange={(e) => handleEducationChange(education.id, "degree", e.target.value)}
                          placeholder="e.g., Bachelor of Science"
                          maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                        />
                        {renderCharacterCount(education.degree.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${education.id}`}
                          value={education.field}
                          onChange={(e) => handleEducationChange(education.id, "field", e.target.value)}
                          placeholder="e.g., Computer Science"
                          maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                        />
                        {renderCharacterCount(education.field.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`school-${education.id}`}>School</Label>
                        <Input
                          id={`school-${education.id}`}
                          value={education.school}
                          onChange={(e) => handleEducationChange(education.id, "school", e.target.value)}
                          placeholder="School Name"
                          maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                        />
                        {renderCharacterCount(education.school.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`eduStartDate-${education.id}`}>Start Date</Label>
                          <Input
                            id={`eduStartDate-${education.id}`}
                            value={education.startDate}
                            onChange={(e) => handleEducationChange(education.id, "startDate", e.target.value)}
                            placeholder="e.g., Sep 2016"
                            maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                          />
                          {renderCharacterCount(education.startDate.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`eduEndDate-${education.id}`}>End Date</Label>
                          <Input
                            id={`eduEndDate-${education.id}`}
                            value={education.endDate}
                            onChange={(e) => handleEducationChange(education.id, "endDate", e.target.value)}
                            placeholder="e.g., Jun 2020"
                            maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                          />
                          {renderCharacterCount(education.endDate.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h3 className="font-medium text-lg">Technical Skills</h3>
                  <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_TECHNICAL_SKILLS} technical skills to ensure a clean one-page resume.`} />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill("technical")}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Skill
                </Button>
              </div>
              
              {resumeData.skills.technical.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => handleSkillChange("technical", index, e.target.value)}
                      placeholder="e.g., JavaScript"
                      className="flex-1"
                      maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                    />
                    {resumeData.skills.technical.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill("technical", index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {renderCharacterCount(skill.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h3 className="font-medium text-lg">Professional Skills</h3>
                  <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_PROFESSIONAL_SKILLS} professional skills to ensure a clean one-page resume.`} />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill("professional")}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Skill
                </Button>
              </div>
              
              {resumeData.skills.professional.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => handleSkillChange("professional", index, e.target.value)}
                      placeholder="e.g., Project Management"
                      className="flex-1"
                      maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                    />
                    {resumeData.skills.professional.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill("professional", index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {renderCharacterCount(skill.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h3 className="font-medium text-lg">Languages</h3>
                  <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_LANGUAGES} languages to ensure a clean one-page resume.`} />
                </div>
                <Button variant="outline" size="sm" onClick={addLanguage}>
                  <PlusCircle className="h-4 w-4 mr-1" /> Add Language
                </Button>
              </div>
              
              {resumeData.languages.map((language, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex gap-2">
                    <Input
                      value={language.name}
                      onChange={(e) => handleLanguageChange(index, "name", e.target.value)}
                      placeholder="Language name"
                      className="flex-1"
                      maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                    />
                    <Input
                      value={language.proficiency}
                      onChange={(e) => handleLanguageChange(index, "proficiency", e.target.value)}
                      placeholder="Proficiency level"
                      className="flex-1"
                      maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                    />
                    {resumeData.languages.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLanguage(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/2 pr-1">
                      {renderCharacterCount(language.name.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                    </div>
                    <div className="w-1/2 pl-1">
                      {renderCharacterCount(language.proficiency.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h3 className="font-medium text-lg">Projects</h3>
              <LimitInfoTooltip text={`Limited to ${RESUME_LIMITS.MAX_PROJECTS} projects to ensure a clean one-page resume.`} />
            </div>
            <Button variant="outline" size="sm" onClick={addProject}>
              <PlusCircle className="h-4 w-4 mr-1" /> Add Project
            </Button>
          </div>
          
          <Accordion type="multiple" defaultValue={resumeData.projects.map(proj => proj.id)}>
            {resumeData.projects.map((project, projIndex) => (
              <AccordionItem key={project.id} value={project.id}>
                <div className="flex items-center">
                  <AccordionTrigger className="flex-1">
                    {project.name || `Project ${projIndex + 1}`}
                  </AccordionTrigger>
                  {resumeData.projects.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeProject(project.id)}
                      className="mr-4 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor={`projectName-${project.id}`}>Project Name</Label>
                      <Input
                        id={`projectName-${project.id}`}
                        value={project.name}
                        onChange={(e) => handleProjectChange(project.id, "name", e.target.value)}
                        placeholder="Project Name"
                        maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                      />
                      {renderCharacterCount(project.name.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`projectDescription-${project.id}`}>Description</Label>
                      <Textarea
                        id={`projectDescription-${project.id}`}
                        value={project.description}
                        onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                        placeholder="Project Description"
                        maxLength={RESUME_LIMITS.PROJECT_DESCRIPTION_MAX_LENGTH}
                      />
                      {renderCharacterCount(project.description.length, RESUME_LIMITS.PROJECT_DESCRIPTION_MAX_LENGTH)}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`projectLink-${project.id}`}>Link</Label>
                      <Input
                        id={`projectLink-${project.id}`}
                        value={project.link}
                        onChange={(e) => handleProjectChange(project.id, "link", e.target.value)}
                        placeholder="Project Link"
                        maxLength={RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH}
                      />
                      {renderCharacterCount(project.link.length, RESUME_LIMITS.INPUT_TEXT_MAX_LENGTH)}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
