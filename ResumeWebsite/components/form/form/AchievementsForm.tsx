
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Achievement } from '@/ResumeWebsite/types/resume';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/ResumeWebsite/components/ui/use-toast";

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

const AchievementsForm = ({ achievements, onChange }: AchievementsFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const { toast } = useToast();

  const handleAdd = () => {
    if (!title || !description || !date) return;
    
    if (achievements.length >= 2) {
      toast({
        title: "Maximum limit reached",
        description: "You can only add up to 2 achievements",
        variant: "destructive"
      });
      return;
    }
    
    const newAchievement: Achievement = {
      id: uuidv4(),
      title,
      description,
      date
    };
    
    onChange([...achievements, newAchievement]);
    setTitle('');
    setDescription('');
    setDate('');
  };

  const handleRemove = (id: string) => {
    onChange(achievements.filter(achievement => achievement.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Achievement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Date (e.g., Jan 2024)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button 
          type="button" 
          onClick={handleAdd} 
          className="w-full"
          disabled={achievements.length >= 2}
        >
          Add Achievement
        </Button>
      </div>

      <div className="space-y-2">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <p className="font-medium">{achievement.title}</p>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              <p className="text-sm text-gray-500">{achievement.date}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(achievement.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsForm;
