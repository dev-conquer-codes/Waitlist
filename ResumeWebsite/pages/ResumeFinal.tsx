import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResumeData, ResumeType } from '@/ResumeWebsite/types/resume';
import ResumeForm from '@/ResumeWebsite/components/form/form/ResumeForm';

import { generatePdf } from '@/ResumeWebsite/utils/pdfUtils';
import { Download } from 'lucide-react';
import { useToast } from '@/ResumeWebsite/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from "@/ResumeWebsite/components/ui/card";
import ClassicResumePreview2 from '../components/matureSections/ClassicResumePreview2';
import ClassicResumePreview3 from '../components/matureSections/ClassicResumePreview3';
import ClassicResumePreview from '../components/matureSections/ClassicResumePreview';

const initialResumeData: ResumeData = {
  type: "experienced",
  personalInfo: {
    fullName: "John Doe",
    title: "Software Engineer",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com"
  },
  education: [{
    id: "edu-1",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Example",
    location: "Example City",
    startDate: "2016",
    endDate: "2020",
    gpa: "3.8/4.0"
  }],
  experience: [{
    id: "exp-1",
    position: "Software Engineer",
    company: "Tech Company",
    location: "San Francisco, CA",
    startDate: "Jan 2021",
    endDate: "Present",
    descriptions: [
      "Developed and maintained web applications using React and Node.js",
      "Collaborated with cross-functional teams to deliver high-quality software",
      "Improved application performance by 30% through code optimization"
    ]
  }],
  projects: [{
    id: "proj-1",
    title: "Personal Portfolio Website",
    technologies: "React, Tailwind CSS, TypeScript",
    startDate: "Dec 2020",
    endDate: "Jan 2021",
    descriptions: [
      "Built a responsive portfolio website showcasing projects and skills",
      "Implemented dark mode and accessibility features"
    ]
  }],
  skills: [
    { id: "skill-1", name: "JavaScript" },
    { id: "skill-2", name: "React" },
    { id: "skill-3", name: "Node.js" },
    { id: "skill-4", name: "TypeScript" }
  ],
  achievements: [],
  certifications: [],
  extraSection: "none",
  extraSectionPosition: "bottom"
};

interface ResumeFinalProps {
  id: string;
}

const ResumeFinal: React.FC<ResumeFinalProps> = ({ id }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [resumeType, setResumeType] = useState<ResumeType>("experienced");
  const { toast } = useToast();

  const handleResumeTypeChange = (type: ResumeType) => {
    setResumeType(type);
    setResumeData(prevData => ({
      ...prevData,
      type
    }));
  };

  const handleFormChange = (updatedData: Partial<ResumeData>) => {
    setResumeData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  const handleDownload = async () => {
    try {
      await generatePdf('resume-preview', `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_resume`);
      toast({
        title: "Success!",
        description: "Your resume has been downloaded successfully."
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-resume-primary">Resume Builder</h1>
            <p className="text-resume-gray mt-1">Create a professional resume in minutes</p>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-blue-400 hover:bg-blue-700 shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-128px)]">
          {/* Left side: Form */}
          <Card className="flex flex-col w-full md:w-[40%] h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="flex flex-col p-6 h-full overflow-hidden">
              <Tabs
                defaultValue="experienced"
                value={resumeType}
                onValueChange={val => handleResumeTypeChange(val as ResumeType)}
                className="flex-shrink-0"
              >
                <TabsList className="grid grid-cols-2 mb-6 bg-gray-100/80 p-1 rounded-lg">
                  <TabsTrigger
                    value="experienced"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    Experienced
                  </TabsTrigger>
                  <TabsTrigger
                    value="fresher"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    Fresher
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="experienced" className="mt-0">
                  <p className="text-sm text-resume-gray mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    For experienced professionals, we'll prioritize your work experience to highlight your career achievements.
                  </p>
                </TabsContent>
                <TabsContent value="fresher" className="mt-0">
                  <p className="text-sm text-resume-gray mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    For freshers, we'll emphasize your projects and education to showcase your relevant skills and qualifications.
                  </p>
                </TabsContent>
              </Tabs>

              <ScrollArea className="flex-1 overflow-y-auto pr-3 mt-4">
                <ResumeForm resumeData={resumeData} onChange={handleFormChange} />
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right side: Preview */}
          <div className="flex flex-col w-full md:w-[80%] h-full bg-white rounded-lg shadow-lg p-4 overflow-hidden">
            <ScrollArea className="flex-1 overflow-y-auto">
              <div className="flex justify-center items-start">
                <div className="w-full max-w-[210mm] scale-90 sm:scale-75 md:scale-80 xl:scale-90 origin-top transition-all duration-300">
                  {id=='1' && <ClassicResumePreview resumeData={resumeData} />}
                  {id=='2' && <ClassicResumePreview2 resumeData={resumeData} />}
                  {id=='3' && <ClassicResumePreview3 resumeData={resumeData} />}
                 
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeFinal;
