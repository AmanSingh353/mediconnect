
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarClock, Baby, Heart, HeartPulse } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PregnancyTrackerContentProps {
  activeSection: string;
  view: "before" | "after";
}

export default function PregnancyTrackerContent({ activeSection, view }: PregnancyTrackerContentProps) {
  const [dueDate, setDueDate] = useState<Date>();
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [note, setNote] = useState("");

  // Calculate weeks of pregnancy if due date is set
  const calculateWeeks = () => {
    if (!dueDate) return 0;
    
    const today = new Date();
    // Pregnancy is typically 40 weeks, count backwards from due date
    const pregnancyStart = new Date(dueDate);
    pregnancyStart.setDate(pregnancyStart.getDate() - 280); // 40 weeks = 280 days
    
    const diffTime = today.getTime() - pregnancyStart.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    
    return weeks > 0 ? Math.min(weeks, 40) : 0;
  };

  const weeks = calculateWeeks();
  const progress = (weeks / 40) * 100;

  const renderTimelineSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Pregnancy Timeline</CardTitle>
        <CardDescription>Track your pregnancy progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal w-full",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Select Due Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {dueDate && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Week {weeks} of 40</span>
                <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Due Date</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{format(dueDate, "PPP")}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Trimester</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {weeks <= 13 ? "First" : weeks <= 26 ? "Second" : "Third"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderHealthTrackingSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Health Tracking</CardTitle>
        <CardDescription>Record your measurements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight</Label>
          <div className="flex items-center space-x-2">
            <Input 
              id="weight" 
              placeholder="Enter weight" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span className="text-sm text-muted-foreground">kg</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="blood-pressure">Blood Pressure</Label>
          <Input 
            id="blood-pressure" 
            placeholder="e.g. 120/80" 
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="note">Notes</Label>
          <Textarea 
            id="note" 
            placeholder="Record any symptoms or thoughts" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Entry</Button>
      </CardFooter>
    </Card>
  );

  const renderAppointmentsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming {view === "before" ? "Prenatal" : "Pediatric"} Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {view === "before" ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ultrasound Scan</p>
                  <p className="text-sm text-muted-foreground">Dr. Emma Roberts</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">May 25, 2025</p>
                  <p className="text-sm">11:00 AM</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">OB-GYN Checkup</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">June 10, 2025</p>
                  <p className="text-sm">9:30 AM</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Well-Baby Checkup</p>
                  <p className="text-sm text-muted-foreground">Dr. Michael Chen</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">June 5, 2025</p>
                  <p className="text-sm">2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vaccination</p>
                  <p className="text-sm text-muted-foreground">City Pediatric Clinic</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">July 10, 2025</p>
                  <p className="text-sm">10:15 AM</p>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Schedule Appointment</Button>
      </CardFooter>
    </Card>
  );
  
  const renderNotesSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>{view === "before" ? "Pregnancy" : "Baby"} Notes</CardTitle>
        <CardDescription>Keep track of important information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            placeholder={view === "before" 
              ? "Record any symptoms, questions for your doctor, or pregnancy milestones..." 
              : "Record baby milestones, feeding patterns, or questions for your pediatrician..."}
            className="h-48"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Clear</Button>
        <Button>Save Note</Button>
      </CardFooter>
    </Card>
  );

  const renderBabyInfoSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Baby Information</CardTitle>
        <CardDescription>Track your baby's development</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baby-name">Baby's Name</Label>
          <Input id="baby-name" placeholder="Enter baby's name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-date">Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="birth-date"
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                <span>Select Birth Date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baby-weight">Birth Weight</Label>
          <div className="flex items-center space-x-2">
            <Input id="baby-weight" placeholder="Enter birth weight" />
            <span className="text-sm text-muted-foreground">g</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baby-length">Birth Length</Label>
          <div className="flex items-center space-x-2">
            <Input id="baby-length" placeholder="Enter birth length" />
            <span className="text-sm text-muted-foreground">cm</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGrowthTrackingSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Growth Tracking</CardTitle>
        <CardDescription>Monitor your baby's growth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-weight">Current Weight</Label>
          <div className="flex items-center space-x-2">
            <Input id="current-weight" placeholder="Enter current weight" />
            <span className="text-sm text-muted-foreground">kg</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="current-length">Current Length</Label>
          <div className="flex items-center space-x-2">
            <Input id="current-length" placeholder="Enter current length" />
            <span className="text-sm text-muted-foreground">cm</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="milestone">Recent Milestone</Label>
          <Input id="milestone" placeholder="e.g. First smile, rolling over" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Entry</Button>
      </CardFooter>
    </Card>
  );

  const renderMilestonesSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Baby Milestones</CardTitle>
        <CardDescription>Track important baby development milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {[
            "First Smile", 
            "Rolling Over", 
            "Sitting Up Unassisted", 
            "First Word",
            "First Steps"
          ].map((milestone) => (
            <div key={milestone} className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id={`milestone-${milestone.toLowerCase().replace(/\s/g, '-')}`}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={`milestone-${milestone.toLowerCase().replace(/\s/g, '-')}`}
                  className="cursor-pointer"
                >
                  {milestone}
                </Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <CalendarClock className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add Custom Milestone</Button>
      </CardFooter>
    </Card>
  );

  const renderContent = () => {
    if (view === "before") {
      switch (activeSection) {
        case "timeline": return renderTimelineSection();
        case "health": return renderHealthTrackingSection();
        case "appointments": return renderAppointmentsSection();
        case "notes": return renderNotesSection();
        default: return renderTimelineSection();
      }
    } else {
      switch (activeSection) {
        case "baby": return renderBabyInfoSection();
        case "growth": return renderGrowthTrackingSection();
        case "milestones": return renderMilestonesSection();
        case "appointments": return renderAppointmentsSection();
        case "notes": return renderNotesSection();
        default: return renderBabyInfoSection();
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {renderContent()}
    </div>
  );
}
