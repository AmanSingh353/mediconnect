
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CalendarClock, MapPin, Pill, TestTube, Stethoscope } from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    name: "Health Records",
    href: "/health-records",
    icon: <TestTube className="h-5 w-5" />,
  },
  {
    name: "Order Medicine",
    href: "/medicine",
    icon: <Pill className="h-5 w-5" />,
  },
  {
    name: "Reminders",
    href: "/reminders",
    icon: <CalendarClock className="h-5 w-5" />,
  },
  {
    name: "Nearby Doctors",
    href: "/doctors",
    icon: <MapPin className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-primary">MediConnect</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/50 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
            SS
          </div>
          <div>
            <p className="text-sm font-medium">savvysid</p>
            <p className="text-xs text-sidebar-foreground/70">Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}
