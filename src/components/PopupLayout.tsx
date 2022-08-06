import React from "react";
import Image from "next/image";

interface PopupLayoutProps {
  children: React.ReactNode;
  closeHanlder: () => void;
}

const PopupLayout: React.FC<PopupLayoutProps> = ({
  children,
  closeHanlder,
}) => {
  return (
    <div className="fixed top-0 left-0 bg-black/20 w-full h-screen z-10 flex justify-center items-center">
      <div className="bg-white  w-full max-w-[400px] min-h-[250px] rounded-xl p-6 relative pt-10">
        <button
          className="absolute right-6 top-6 cursor-pointer"
          onClick={closeHanlder}
        >
          <Image
            src="/icons/close.png"
            width={20}
            height={20}
            layout="fixed"
            alt="close"
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupLayout;
