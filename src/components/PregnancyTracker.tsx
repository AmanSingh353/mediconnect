
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Baby, Calendar } from "lucide-react";
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

  // Array of sections for both "before" and "after" views
  const beforeSections = ["timeline", "health", "appointments", "notes"];
  const afterSections = ["baby", "growth", "milestones", "appointments", "notes"];

  // Navigation buttons for sub-sections
  const renderSectionNav = () => {
    const sections = activeTab === "before" ? beforeSections : afterSections;
    
    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleSectionChange(section)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeSection === section
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pregnancy Tracker</h1>
        <p className="text-muted-foreground">Track your pregnancy journey before and after birth.</p>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 p-1 rounded-full bg-muted">
          <TabsTrigger value="before" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Before Birth
          </TabsTrigger>
          <TabsTrigger value="after" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Baby className="w-4 h-4 mr-2" />
            After Birth
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          {renderSectionNav()}
        </div>
        
        <TabsContent value="before" className="pt-4">
          <div className="min-h-[calc(100vh-250px)] w-full rounded-md border p-6 bg-white">
            <PregnancyTrackerContent activeSection={activeSection} view="before" />
          </div>
        </TabsContent>
        
        <TabsContent value="after" className="pt-4">
          <div className="min-h-[calc(100vh-250px)] w-full rounded-md border p-6 bg-white">
            <PregnancyTrackerContent activeSection={activeSection} view="after" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
