import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PersonalInfo, MAX_SUMMARY_LENGTH } from "@/ResumeWebsite/types/resume2";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

const PersonalInfoForm = ({ personalInfo, onChange }: PersonalInfoFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...personalInfo,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title *</Label>
          <Input
            id="title"
            name="title"
            value={personalInfo.title}
            onChange={handleChange}
            placeholder="Software Engineer"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary (Optional) - Max {MAX_SUMMARY_LENGTH} characters</Label>
        <Textarea
          id="summary"
          name="summary"
          value={personalInfo.summary || ''}
          onChange={handleChange}
          placeholder="A brief summary of your professional background and career objectives"
          className="h-24 resize-none"
          maxLength={MAX_SUMMARY_LENGTH}
        />
        {personalInfo.summary && (
          <p className="text-xs text-muted-foreground mt-1">
            {personalInfo.summary.length}/{MAX_SUMMARY_LENGTH} characters
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="City, State"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={personalInfo.website || ''}
            onChange={handleChange}
            placeholder="johndoe.com"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
