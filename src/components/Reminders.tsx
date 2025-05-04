
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, Calendar as CalendarIcon } from "lucide-react";

export default function Reminders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reminders</h1>
        <p className="text-muted-foreground">Keep track of your appointments and medication schedule.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="pt-4">
              <div className="space-y-4">
                <ReminderCard
                  title="Take Lisinopril"
                  time="8:00 AM"
                  type="Medication"
                  status="Completed"
                  details="10mg, 1 tablet"
                />
                <ReminderCard
                  title="Take Metformin"
                  time="8:00 AM"
                  type="Medication"
                  status="Completed"
                  details="500mg, 1 tablet"
                />
                <ReminderCard
                  title="Blood Pressure Check"
                  time="10:00 AM"
                  type="Health Task"
                  status="Pending"
                  details="Use home monitor and record results"
                />
                <ReminderCard
                  title="Take Metformin"
                  time="8:00 PM"
                  type="Medication"
                  status="Upcoming"
                  details="500mg, 1 tablet"
                />
                <ReminderCard
                  title="Take Atorvastatin"
                  time="9:00 PM"
                  type="Medication"
                  status="Upcoming"
                  details="20mg, 1 tablet"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="pt-4">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">Tomorrow, May 5</h3>
                <div className="space-y-3">
                  <ReminderCard
                    title="Take Lisinopril"
                    time="8:00 AM"
                    type="Medication"
                    status="Upcoming"
                    details="10mg, 1 tablet"
                  />
                  <ReminderCard
                    title="Take Metformin"
                    time="8:00 AM"
                    type="Medication"
                    status="Upcoming"
                    details="500mg, 1 tablet"
                  />
                  <ReminderCard
                    title="Take Metformin"
                    time="8:00 PM"
                    type="Medication"
                    status="Upcoming"
                    details="500mg, 1 tablet"
                  />
                  <ReminderCard
                    title="Take Atorvastatin"
                    time="9:00 PM"
                    type="Medication"
                    status="Upcoming"
                    details="20mg, 1 tablet"
                  />
                </div>
                
                <h3 className="font-medium text-sm text-muted-foreground mt-6">May 10, 2025</h3>
                <div className="space-y-3">
                  <ReminderCard
                    title="Cardiology Appointment"
                    time="10:30 AM"
                    type="Appointment"
                    status="Upcoming"
                    details="Dr. Sarah Johnson - City Medical Center"
                  />
                </div>
                
                <h3 className="font-medium text-sm text-muted-foreground mt-6">May 15, 2025</h3>
                <div className="space-y-3">
                  <ReminderCard
                    title="Blood Test"
                    time="9:00 AM"
                    type="Lab Test"
                    status="Upcoming"
                    details="LabCorp - Complete Blood Count and Lipid Panel"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medications" className="pt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Daily Medications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Lisinopril 10mg</p>
                          <p className="text-sm text-muted-foreground">1 tablet once daily</p>
                        </div>
                        <Badge>8:00 AM</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Metformin 500mg</p>
                          <p className="text-sm text-muted-foreground">1 tablet twice daily</p>
                        </div>
                        <Badge>8:00 AM / 8:00 PM</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atorvastatin 20mg</p>
                          <p className="text-sm text-muted-foreground">1 tablet at bedtime</p>
                        </div>
                        <Badge>9:00 PM</Badge>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Manage Medication Schedule</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments" className="pt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Upcoming Appointments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Cardiology Appointment</p>
                        <p className="text-sm">Dr. Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">City Medical Center, Suite 302</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">May 10, 2025</p>
                        <p className="text-sm">10:30 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Blood Test</p>
                        <p className="text-sm">LabCorp</p>
                        <p className="text-xs text-muted-foreground">Complete Blood Count and Lipid Panel</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">May 15, 2025</p>
                        <p className="text-sm">9:00 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Primary Care Checkup</p>
                        <p className="text-sm">Dr. Emily Chen</p>
                        <p className="text-xs text-muted-foreground">Community Health Partners</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">June 2, 2025</p>
                        <p className="text-sm">2:45 PM</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Schedule New Appointment</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Full Calendar</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-center mt-8">
        <Button className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          <span>Set New Reminder</span>
        </Button>
      </div>
    </div>
  );
}

interface ReminderCardProps {
  title: string;
  time: string;
  type: string;
  status: "Completed" | "Pending" | "Upcoming";
  details: string;
}

function ReminderCard({ title, time, type, status, details }: ReminderCardProps) {
  return (
    <Card className="reminder-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
        <Badge 
          variant={
            status === "Completed" ? "outline" : 
            status === "Pending" ? "secondary" : "default"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs rounded-sm">
            {type}
          </Badge>
          <p className="text-sm">{details}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm">
          {status === "Completed" ? "View" : "Mark as Taken"}
        </Button>
      </CardFooter>
    </Card>
  );
}
