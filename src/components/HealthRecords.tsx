
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTube } from "lucide-react";

export default function HealthRecords() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Health Records</h1>
        <p className="text-muted-foreground">View and manage your health information.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="tests">Lab Tests</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="vaccines">Vaccines</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <div className="health-grid">
            <RecordCard 
              title="Annual Physical Exam"
              date="Apr 10, 2025"
              provider="Dr. James Wilson"
              type="Visit"
            />
            <RecordCard 
              title="Complete Blood Count (CBC)"
              date="Apr 10, 2025"
              provider="LabCorp"
              type="Lab Test"
            />
            <RecordCard 
              title="Lipid Panel"
              date="Apr 10, 2025"
              provider="LabCorp"
              type="Lab Test"
            />
            <RecordCard 
              title="COVID-19 Vaccination"
              date="Mar 15, 2025"
              provider="City Clinic"
              type="Vaccine"
            />
            <RecordCard 
              title="Diabetes Consultation"
              date="Feb 22, 2025"
              provider="Dr. Emily Chen"
              type="Visit"
            />
            <RecordCard 
              title="Hemoglobin A1C"
              date="Feb 22, 2025"
              provider="Quest Diagnostics"
              type="Lab Test"
            />
            <RecordCard 
              title="Flu Vaccination"
              date="Nov 5, 2024"
              provider="Pharmacy Plus"
              type="Vaccine"
            />
          </div>
        </TabsContent>
        <TabsContent value="tests" className="pt-4">
          <div className="health-grid">
            <RecordCard 
              title="Complete Blood Count (CBC)"
              date="Apr 10, 2025"
              provider="LabCorp"
              type="Lab Test"
            />
            <RecordCard 
              title="Lipid Panel"
              date="Apr 10, 2025"
              provider="LabCorp"
              type="Lab Test"
            />
            <RecordCard 
              title="Hemoglobin A1C"
              date="Feb 22, 2025"
              provider="Quest Diagnostics"
              type="Lab Test"
            />
          </div>
        </TabsContent>
        <TabsContent value="visits" className="pt-4">
          <div className="health-grid">
            <RecordCard 
              title="Annual Physical Exam"
              date="Apr 10, 2025"
              provider="Dr. James Wilson"
              type="Visit"
            />
            <RecordCard 
              title="Diabetes Consultation"
              date="Feb 22, 2025"
              provider="Dr. Emily Chen"
              type="Visit"
            />
          </div>
        </TabsContent>
        <TabsContent value="vaccines" className="pt-4">
          <div className="health-grid">
            <RecordCard 
              title="COVID-19 Vaccination"
              date="Mar 15, 2025"
              provider="City Clinic"
              type="Vaccine"
            />
            <RecordCard 
              title="Flu Vaccination"
              date="Nov 5, 2024"
              provider="Pharmacy Plus"
              type="Vaccine"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button className="flex items-center gap-2">
          <TestTube className="h-4 w-4" />
          <span>Add Health Record</span>
        </Button>
      </div>
    </div>
  );
}

interface RecordCardProps {
  title: string;
  date: string;
  provider: string;
  type: string;
}

function RecordCard({ title, date, provider, type }: RecordCardProps) {
  return (
    <Card className="record-card">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm">{provider}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <span className="text-xs px-2 py-1 rounded-full bg-medic-100 text-medic-700">
          {type}
        </span>
        <Button variant="ghost" size="sm" className="text-xs">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
