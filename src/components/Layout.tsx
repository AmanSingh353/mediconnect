
import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 md:px-8">
          <div className="md:hidden flex items-center">
            <div className="rounded-full bg-primary p-1">
              <span className="text-sm font-medium text-white">MC</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-primary">MediConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-muted p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-sm font-medium">SS</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
