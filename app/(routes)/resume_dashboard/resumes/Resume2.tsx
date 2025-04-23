import { useEffect, useRef, useState } from "react";
import ResumeForm from "./component2/ResumeForm";
import ResumePreview from "./component2/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas-pro";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import jsPDF from "jspdf";

import { ResumeData, RESUME_LIMITS } from "./types/resume";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "./hooks/use-toast";
import Navbar from "@/app/_components/Navbar";

const Resume2 = () => {
  const { toast } = useToast();
  const resumeRef = useRef<HTMLDivElement>(null);
  const { user } = useUser(); // Clerk user
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: "ALEXANDER",
      lastName: "WILLIAM SMITH",
      jobTitle: "SOFTWARE ENGINEER",
      phone: "+1 555 4 56 7890",
      email: "alexander-smith@mail.com",
      website: "www.alexander-website.com",
      location: "23 St. Tec City Los Angeles, CA",
      profileImage: ""
    },
    summary:
      "Dynamic Software Engineer with over 5 years of experience specializing in system architecture and development. Adept at optimizing code and integrating new innovative solutions to increase efficiency and scalability. Successfully led projects resulting in a 40% increase in performance metrics. Passionate about agile methodologies and ready to bring technical acumen to a progressive team.",
    workExperience: [
      {
        id: "1",
        title: "LEAD SOFTWARE ENGINEER",
        company: "Digital Innovations Inc",
        startDate: "June 2021",
        endDate: "Present",
        responsibilities: [
          "Successfully managed a team of 10 engineers effectively in developing innovative and scalable software solutions, significantly improving project delivery by 35%.",
          "Adeptly implemented Django, RESTful APIs, and other web services, notably enhancing system interoperability, functionality, and overall performance.",
        ]
      },
      {
        id: "2",
        title: "SOFTWARE ENGINEER",
        company: "CloudTech Solutions",
        startDate: "July 2018",
        endDate: "May 2021",
        responsibilities: [
          "Developed 8 cloud-based applications, improving main system reliability by 30%.",
          "Actively participated in the entire software development lifecycle, from initial concept to final deployment and maintenance, ultimately delivering the final product.",
        
        ]
      }
    ],
    education: [
      {
        id: "1",
        degree: "Master of Science",
        field: "Software Engineering",
        school: "Stanford University",
        startDate: "Sep 2016",
        endDate: "Jun 2018"
      }
    ],
    skills: {
      technical: [
        "System Architecture",
        "Java & Python",
        "Git & GitHub",
        "Agile & Scrum",
        "Problem Solving",
        "Leadership"
      ],
      professional: [
        "Effective Communication",
        "Strategic Planning",
        "Decision Making",
        "Time Management",
        "Adaptability & Flexibility"
      ]
    },
    languages: [
      { name: "English", proficiency: "Fluent" },
      { name: "Spanish", proficiency: "Intermediate" }
    ],
    projects: [
      {
        id: "1",
        name: "E-commerce Platform",
        description: "A scalable solution for online retail.",
        link: "link"
      },
      {
        id: "2",
        name: "Health Tracking App",
        description: "Complex app for monitoring daily health metrics",
        link: "link"
      }
    ]
  });

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      toast({
        title: "Preparing your resume",
        description: "Please wait while we generate your PDF..."
      });

      const pixelRatio = 2;

      const canvas = await html2canvas(resumeRef.current, {
        scale: pixelRatio,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasAspectRatio = canvas.width / canvas.height;
      let imgWidth = pdfWidth - 20;
      let imgHeight = imgWidth / canvasAspectRatio;

      if (imgHeight > pdfHeight - 20) {
        imgHeight = pdfHeight - 20;
        imgWidth = imgHeight * canvasAspectRatio;
      }

      const xOffset = (pdfWidth - imgWidth) / 2;
      const yOffset = 10;

      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);
      pdf.save("resume.pdf");

      toast({
        title: "Success!",
        description: "Your resume has been downloaded successfully."
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };
  useEffect(() => {
    if (!user?.id) return;

    const saveResumeData = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_RENDER}/user/save_user_resume_data`, {
          recordId: user.id,
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

    // 🕒 Debounce the call by 1s
    const timeout = setTimeout(() => {
      saveResumeData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [resumeData, user?.id]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white py-4 px-6 shadow-sm flex justify-between items-center sticky top-0 z-10">
        <Navbar/>
          
        
      </header>
<div className="flex items-end justify-end mt-4 mr-4">
      <Button onClick={handleDownload} className="bg-black hover:bg-gray-800">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          </div>
      <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        {/* Form Section */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm p-6 max-h-[calc(100vh-8rem)] overflow-hidden">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </ScrollArea>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-6 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="flex justify-center">
              <div className="relative w-full max-w-[794px]">
                <div
                  ref={resumeRef}
                  className="w-full aspect-[210/297] bg-white shadow-lg overflow-hidden"
                >
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Resume2;
