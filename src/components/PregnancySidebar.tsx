
import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Baby, CalendarClock, FileText, Heart, HeartPulse, Stethoscope, Activity, Weight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, isActive, href, onClick }: SidebarItemProps) => {
  const content = (
    <>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </>
  );

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        isActive={isActive}
        onClick={onClick}
        asChild={!!href}
        tooltip={label}
      >
        {href ? (
          <Link to={href}>
            {content}
          </Link>
        ) : (
          <div>{content}</div>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface PregnancySidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  view: "before" | "after";
}

export default function PregnancySidebar({ activeSection, onSectionChange, view }: PregnancySidebarProps) {
  const beforeSections = [
    { id: "timeline", label: "Timeline", icon: CalendarClock },
    { id: "health", label: "Health Tracking", icon: Heart },
    { id: "appointments", label: "Appointments", icon: Stethoscope },
    { id: "notes", label: "Notes", icon: FileText },
  ];
  
  const afterSections = [
    { id: "baby", label: "Baby Info", icon: Baby },
    { id: "growth", label: "Growth Tracking", icon: Weight },
    { id: "milestones", label: "Milestones", icon: Activity },
    { id: "appointments", label: "Appointments", icon: Stethoscope },
    { id: "notes", label: "Notes", icon: FileText },
  ];

  const sections = view === "before" ? beforeSections : afterSections;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          {view === "before" ? (
            <HeartPulse className="h-6 w-6 text-primary" />
          ) : (
            <Baby className="h-6 w-6 text-primary" />
          )}
          <span className="font-medium text-lg">
            {view === "before" ? "Pregnancy" : "Baby"} Tracker
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((section) => (
                <React.Fragment key={section.id}>
                  <SidebarItem
                    icon={section.icon}
                    label={section.label}
                    isActive={activeSection === section.id}
                    onClick={() => onSectionChange(section.id)}
                  />
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarItem 
            icon={view === "before" ? Baby : HeartPulse}
            label={view === "before" ? "Switch to Baby Mode" : "Switch to Pregnancy Mode"}
            href="#"
          />
          <SidebarItem 
            icon={Stethoscope}
            label="Back to Dashboard"
            href="/"
          />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
