import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResumeData, ExtraSection, ExtraSectionPosition } from "../../types/resume";
import PersonalInfoForm from "./PersonalInfoForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import AchievementsForm from "./AchievementsForm";
import CertificationsForm from "./CertificationsForm";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ResumeFormProps {
  resumeData: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

const ResumeForm = ({ resumeData, onChange }: ResumeFormProps) => {
  const { type, extraSection, extraSectionPosition } = resumeData;
  
  const sections = type === "experienced"
    ? ["personal", "experience", "education", "projects", "skills", "extra"]
    : ["personal", "education", "projects", "experience", "skills", "extra"];

  const handleExtraSectionChange = (value: ExtraSection) => {
    onChange({ extraSection: value });
  };

  const handlePositionChange = (value: ExtraSectionPosition) => {
    onChange({ extraSectionPosition: value });
  };

  const renderSection = (section: string) => {
    switch(section) {
      case "personal":
        return (
          <AccordionItem value="personal" key="personal">
            <AccordionTrigger className="text-lg font-medium">Personal Information</AccordionTrigger>
            <AccordionContent>
              <PersonalInfoForm
                personalInfo={resumeData.personalInfo}
                onChange={(personalInfo) => onChange({ personalInfo })}
              />
            </AccordionContent>
          </AccordionItem>
        );
      case "education":
        return (
          <AccordionItem value="education" key="education">
            <AccordionTrigger className="text-lg font-medium">Education</AccordionTrigger>
            <AccordionContent>
              <EducationForm
                education={resumeData.education}
                onChange={(education) => onChange({ education })}
              />
            </AccordionContent>
          </AccordionItem>
        );
      case "experience":
        return (
          <AccordionItem value="experience" key="experience">
            <AccordionTrigger className="text-lg font-medium">Work Experience</AccordionTrigger>
            <AccordionContent>
              <ExperienceForm
                experience={resumeData.experience}
                onChange={(experience) => onChange({ experience })}
              />
            </AccordionContent>
          </AccordionItem>
        );
      case "projects":
        return (
          <AccordionItem value="projects" key="projects">
            <AccordionTrigger className="text-lg font-medium">Projects</AccordionTrigger>
            <AccordionContent>
              <ProjectForm
                projects={resumeData.projects}
                onChange={(projects) => onChange({ projects })}
              />
            </AccordionContent>
          </AccordionItem>
        );
      case "skills":
        return (
          <AccordionItem value="skills" key="skills">
            <AccordionTrigger className="text-lg font-medium">Skills</AccordionTrigger>
            <AccordionContent>
              <SkillsForm
                skills={resumeData.skills}
                onChange={(skills) => onChange({ skills })}
              />
            </AccordionContent>
          </AccordionItem>
        );
      case "extra":
        return (
          <AccordionItem value="extra" key="extra">
            <AccordionTrigger className="text-lg font-medium">Additional Section</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Choose an additional section</Label>
                  <RadioGroup
                    value={resumeData.extraSection}
                    onValueChange={(value: ExtraSection) => handleExtraSectionChange(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="achievements" id="achievements" />
                      <Label htmlFor="achievements">Achievements</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="certifications" id="certifications" />
                      <Label htmlFor="certifications">Certifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">None</Label>
                    </div>
                  </RadioGroup>
                </div>

                {extraSection !== 'none' && (
                  <div className="space-y-2">
                    <Label>Section position</Label>
                    <RadioGroup
                      value={extraSectionPosition}
                      onValueChange={(value: ExtraSectionPosition) => handlePositionChange(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sidebar" id="position-sidebar" />
                        <Label htmlFor="position-sidebar">Sidebar</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bottom" id="position-bottom" />
                        <Label htmlFor="position-bottom">Bottom</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {extraSection === 'achievements' && (
                  <AchievementsForm
                    achievements={resumeData.achievements}
                    onChange={(achievements) => onChange({ achievements })}
                  />
                )}

                {extraSection === 'certifications' && (
                  <CertificationsForm
                    certifications={resumeData.certifications}
                    onChange={(certifications) => onChange({ certifications })}
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      default:
        return null;
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="personal">
      {sections.map(renderSection)}
    </Accordion>
  );
};

export default ResumeForm;
