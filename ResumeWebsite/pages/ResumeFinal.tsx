import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ResumeData, ResumeType } from '../types/resume';

import { generatePdf } from '../utils/pdfUtils';
import { Download } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from "../components/ui/card";
import { Mail } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import axios from 'axios';
import ResumeForm from '../components/form/ResumeForm';
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
  skills: [{
    id: "skill-1",
    name: "JavaScript"
  }, {
    id: "skill-2",
    name: "React"
  }, {
    id: "skill-3",
    name: "Node.js"
  }, {
    id: "skill-4",
    name: "TypeScript"
  }],
  achievements: [],
  certifications: [],
  extraSection: "none",
  extraSectionPosition: "sidebar"
};

const ResumeFinal = () => {
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
  const {user}=useUser();
useEffect(()=>{
  if(!user?.id) return;
saveResumeData()
},[resumeData,user?.id])

  const saveResumeData = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_RENDER}/user/save_user_resume_data`, {
        recordId: user?.id,
        template_id: 1, // change accordingly
        resume_data: resumeData,
      });

      toast({
        title: "Resume Auto-Saved",
        description: "Changes saved successfully.",
      });
    } catch (error) {
      console.error("Error saving resume data:", error);
      toast({
        title: "Save Failed",
        description: "Could not save resume data.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white shadow-sm border-b border-gray-200">
             <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
               {/* <div>
                 <h1 className="text-3xl font-bold text-resume-primary">Conquer Jobs  </h1>
                 <p className="text-resume-gray mt-1">Create a professional resume in minutes</p>
               </div> */}
               <div className="flex items-center justify-center py-4 mt-4">
             <div className="flex items-center gap-2 absolute left-8">
               <Image
                 className="w-8 h-8"
                 src="https://conquercodes.com/images/logo.png"
                 alt="Conquer Codes Logo"
                 width={32}
                 height={32}
               />
               <div className="flex flex-col leading-none">
                 <span className="font-bold text-xl text-gray-800">Conquer Jobs</span>
                 <span className="text-[10px] text-center text-gray-500">A part of Conquer Codes</span>
               </div>
             </div>
     
             <div className="absolute right-8 flex items-center gap-2">
               <SignedIn>
               <Button 
                 onClick={handleDownload} 
                 className="bg-blue-400 mr-4 hover:bg-blue-400 shadow-md transition-all duration-300 hover:shadow-lg"
               >
                 <Download className="mr-2 h-4 w-4 " />
                 Download PDF
               </Button>
                 <UserButton afterSignOutUrl="/" />
               </SignedIn>
     
               <SignedOut>
                 <a
                   href="mailto:sonuiitian@conquercodes.com"
                   className="text-gray-600 hover:text-gray-800 text-base transition duration-200 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:shadow-md hidden sm:block"
                 >
                   sonukhairwal@conquercodes.in
                 </a>
                 <a
                   href="mailto:sonuiitian@conquercodes.com"
                   className="sm:hidden block p-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition duration-200"
                 >
                   <Mail className="w-6 h-6 text-gray-600" />
                 </a>
               </SignedOut>
             </div>
           </div>
             
             </div>
           </header>
           <main className="max-w-screen-xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Side - Form */}
          <Card className="w-full md:w-[38%] xl:w-[35%] shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <Tabs 
                defaultValue="experienced" 
                value={resumeType} 
                onValueChange={val => handleResumeTypeChange(val as ResumeType)} 
                className="w-full"
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

              <ScrollArea className="h-[65vh] md:h-[78vh] xl:h-[85vh] pr-2">

                <ResumeForm resumeData={resumeData} onChange={handleFormChange} />
                
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Side - Preview */}
          <div className="w-full md:w-[62%] xl:w-[65%] bg-white shadow-lg p-2 sm:p-4 rounded-lg overflow-hidden">
            <ScrollArea className="h-[65vh] sm:h-[80vh] xl:h-[88vh]">
              <div className="flex justify-center items-start">
                <div className="w-full max-w-[210mm] mx-auto scale-90 sm:scale-75 md:scale-80 xl:scale-90 origin-top transition-all duration-300" id="resume-preview">
                <ClassicResumePreview resumeData={resumeData}/>
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
