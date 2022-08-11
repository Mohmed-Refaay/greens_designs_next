import React, { useMemo } from "react";
import Link from "next/link";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [parent] = useAutoAnimate();
  const router = useRouter();

  const links = useMemo(
    () => [
      { text: "Sections", href: "/admin/sections" },
      { text: "Projects", href: "/admin/projects" },
    ],
    [],
  );

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
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`sidebarLink cursor-pointer ${
                  router.pathname === link.href ? "bg-slate-200" : ""
                } mb-3`}
              >
                {link.text}
              </div>
            </Link>
          ))}
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
