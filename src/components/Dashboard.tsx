
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CalendarClock, MapPin, Pill, TestTube, Baby, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import AiSymptomChecker from "./AiSymptomChecker";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, savvysid</h1>
        <p className="text-muted-foreground">Here's an overview of your health. Try our AI symptom checker for personalized health guidance.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <DashboardCard
          title="AI Symptom Checker"
          description="Get instant health guidance"
          icon={<Bot className="h-5 w-5" />}
          href="#"
          color="bg-primary/10 text-primary"
          isAiChecker
        />
        <DashboardCard
          title="Health Records"
          description="7 records available"
          icon={<TestTube className="h-5 w-5" />}
          href="/health-records"
          color="bg-medic-50 text-medic-700"
        />
        <DashboardCard
          title="Medicine Orders"
          description="3 active prescriptions"
          icon={<Pill className="h-5 w-5" />}
          href="/medicine"
          color="bg-emerald-50 text-emerald-700"
        />
        <DashboardCard
          title="Reminders"
          description="2 reminders today"
          icon={<CalendarClock className="h-5 w-5" />} 
          href="/reminders"
          color="bg-secondary/10 text-secondary"
        />
        <DashboardCard
          title="Nearby Doctors"
          description="5 doctors nearby"
          icon={<MapPin className="h-5 w-5" />}
          href="/doctors"
          color="bg-accent/10 text-accent"
        />
        <DashboardCard
          title="Pregnancy Tracker"
          description="Track your journey"
          icon={<Baby className="h-5 w-5" />}
          href="/pregnancy"
          color="bg-muted/50 text-muted-foreground"
        />
      </div>

      {/* AI Symptom Checker Component */}
      <AiSymptomChecker />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Appointment</CardTitle>
            <CardDescription>Dr. Sarah Johnson - Cardiology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 rounded-md border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <CalendarClock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">May 10, 2025</p>
                <p className="text-xs text-muted-foreground">10:30 AM - 11:00 AM</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">Reschedule</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Medication Adherence</CardTitle>
            <CardDescription>Weekly tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Lisinopril</span>
                  <span className="text-xs text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Metformin</span>
                  <span className="text-xs text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Atorvastatin</span>
                  <span className="text-xs text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Blood Glucose</p>
                  <p className="text-xs text-muted-foreground">Apr 28, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">95 mg/dL</p>
                  <p className="text-xs text-emerald-500">Normal</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Blood Pressure</p>
                  <p className="text-xs text-muted-foreground">Apr 24, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">128/82 mmHg</p>
                  <p className="text-xs text-emerald-500">Normal</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Cholesterol</p>
                  <p className="text-xs text-muted-foreground">Apr 15, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">190 mg/dL</p>
                  <p className="text-xs text-amber-500">Borderline</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  isAiChecker?: boolean;
}

function DashboardCard({ title, description, icon, href, color, isAiChecker }: DashboardCardProps) {
  if (isAiChecker) {
    return (
      <Card className="transition-all duration-200 hover:shadow-md cursor-pointer border-primary/20 hover:border-primary/40">
        <CardHeader className="pb-2">
          <div className={`rounded-md w-fit p-2 ${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">{title}</div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={href}>
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className={`rounded-md w-fit p-2 ${color}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">{title}</div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
