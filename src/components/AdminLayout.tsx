import React from "react";
import Link from "next/link";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="shadow-md bg-green-500 py-4 px-4">
        <h1 className="text-xl font-medium text-white">
          Greens Designs Admin Panel
        </h1>
      </div>
      <div className="flex bg-gray-100 flex-1">
        {/* Sidebar */}
        <div className="shadow-lg flex-none py-5">
          <div className="sidebarLink bg-slate-200 mb-3">
            <Link href="/admin/sections">Sections</Link>
          </div>
          <div className="sidebarLink">
            <Link href="/admin/projects">Projects</Link>
          </div>
        </div>
        {/* Content */}
        <div className="px-8 pt-8 w-full">
          <div className="mt-[40px] w-full" ref={parent as any}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
