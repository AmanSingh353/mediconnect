"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, Calendar as CalendarIcon } from "lucide-react";

type ReminderStatus = "Completed" | "Pending" | "Upcoming";

interface ReminderCardProps {
  title: string;
  time: string;
  type: string;
  status: ReminderStatus;
  details: string;
}

export default function Reminders() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reminders</h1>
        <p className="text-muted-foreground">
          Keep track of your appointments and medication schedule.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Tabs Section */}
        <div className="md:col-span-8">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            {/* Today Tab */}
            <TabsContent value="today" className="pt-4">
              <div className="space-y-4">
                <ReminderCard title="Take Lisinopril" time="8:00 AM" type="Medication" status="Completed" details="10mg, 1 tablet" />
                <ReminderCard title="Take Metformin" time="8:00 AM" type="Medication" status="Completed" details="500mg, 1 tablet" />
                <ReminderCard title="Blood Pressure Check" time="10:00 AM" type="Health Task" status="Pending" details="Use home monitor and record results" />
                <ReminderCard title="Take Metformin" time="8:00 PM" type="Medication" status="Upcoming" details="500mg, 1 tablet" />
                <ReminderCard title="Take Atorvastatin" time="9:00 PM" type="Medication" status="Upcoming" details="20mg, 1 tablet" />
              </div>
            </TabsContent>

            {/* Upcoming Tab */}
            <TabsContent value="upcoming" className="pt-4">
              <div className="space-y-6">
                <Section title="Tomorrow, May 5">
                  <ReminderCard title="Take Lisinopril" time="8:00 AM" type="Medication" status="Upcoming" details="10mg, 1 tablet" />
                  <ReminderCard title="Take Metformin" time="8:00 AM" type="Medication" status="Upcoming" details="500mg, 1 tablet" />
                  <ReminderCard title="Take Metformin" time="8:00 PM" type="Medication" status="Upcoming" details="500mg, 1 tablet" />
                  <ReminderCard title="Take Atorvastatin" time="9:00 PM" type="Medication" status="Upcoming" details="20mg, 1 tablet" />
                </Section>

                <Section title="May 10, 2025">
                  <ReminderCard title="Cardiology Appointment" time="10:30 AM" type="Appointment" status="Upcoming" details="Dr. Sarah Johnson - City Medical Center" />
                </Section>

                <Section title="May 15, 2025">
                  <ReminderCard title="Blood Test" time="9:00 AM" type="Lab Test" status="Upcoming" details="LabCorp - Complete Blood Count and Lipid Panel" />
                </Section>
              </div>
            </TabsContent>

            {/* Medications Tab */}
            <TabsContent value="medications" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daily Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <MedicationItem name="Lisinopril 10mg" schedule="1 tablet once daily" time="8:00 AM" />
                    <MedicationItem name="Metformin 500mg" schedule="1 tablet twice daily" time="8:00 AM / 8:00 PM" />
                    <MedicationItem name="Atorvastatin 20mg" schedule="1 tablet at bedtime" time="9:00 PM" />
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Manage Medication Schedule</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AppointmentItem title="Cardiology Appointment" doctor="Dr. Sarah Johnson" location="City Medical Center, Suite 302" date="May 10, 2025" time="10:30 AM" />
                  <AppointmentItem title="Blood Test" doctor="LabCorp" location="Complete Blood Count and Lipid Panel" date="May 15, 2025" time="9:00 AM" />
                  <AppointmentItem title="Primary Care Checkup" doctor="Dr. Emily Chen" location="Community Health Partners" date="June 2, 2025" time="2:45 PM" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Schedule New Appointment</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Calendar Section */}
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
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Full Calendar</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Add Reminder Button */}
      <div className="flex justify-center mt-8">
        <Button className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4" />
          <span>Set New Reminder</span>
        </Button>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function ReminderCard({ title, time, type, status, details }: ReminderCardProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
        <Badge
          variant={
            status === "Completed"
              ? "outline"
              : status === "Pending"
              ? "secondary"
              : "default"
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs rounded-sm">{type}</Badge>
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

function Section({ title, children }: { title: string; children: react.ReactNode }) {
  return (
    <div>
      <h3 className="font-medium text-sm text-muted-foreground mb-3">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MedicationItem({ name, schedule, time }: { name: string; schedule: string; time: string }) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{schedule}</p>
      </div>
      <Badge>{time}</Badge>
    </li>
  );
}

function AppointmentItem({ title, doctor, location, date, time }: { title: string; doctor: string; location: string; date: string; time: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm">{doctor}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{date}</p>
        <p className="text-sm">{time}</p>
      </div>
    </div>
  );
}
