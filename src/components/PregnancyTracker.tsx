
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PregnancyTrackerContent from "./PregnancyTrackerContent";

export default function PregnancyTracker() {
  const [activeTab, setActiveTab] = useState("before");
  const [activeSection, setActiveSection] = useState("timeline");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setActiveSection(value === "before" ? "timeline" : "baby");
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pregnancy Tracker</h1>
        <p className="text-muted-foreground">Track your pregnancy journey before and after birth.</p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="before">Before Birth</TabsTrigger>
          <TabsTrigger value="after">After Birth</TabsTrigger>
        </TabsList>
        
        <TabsContent value="before" className="pt-4">
          <div className="min-h-[calc(100vh-250px)] w-full rounded-md border p-6">
            <PregnancyTrackerContent activeSection={activeSection} view="before" />
          </div>
        </TabsContent>
        
        <TabsContent value="after" className="pt-4">
          <div className="min-h-[calc(100vh-250px)] w-full rounded-md border p-6">
            <PregnancyTrackerContent activeSection={activeSection} view="after" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
