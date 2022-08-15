import Image from "next/image";
import React from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className="flex justify-between items-center py-3 px-6 shadow-sm border-b border-gray-200 sticky top-0 mb-7 z-10 bg-white">
      <div className="flex justify-start items-center gap-4 flex-1">
        <p className="text-green-500">Projects</p>
        <p className="text-green-500">Culture</p>
        <p className="text-green-500">Contact Us</p>
      </div>
      <div className="relative w-[95px] h-[95px]">
        <Image src="/logo.jpg" alt="greens designs" layout="fill" />
      </div>
      <div className="flex justify-start items-center gap-4 flex-1"></div>
    </nav>
  );
};

export default Navbar;
