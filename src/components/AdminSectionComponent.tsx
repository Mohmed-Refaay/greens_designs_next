import React from "react";
import Image from "next/image";
import {
  GetSectionsDocument,
  useDeleteSectionMutation,
} from "../client/generated/graphql";

export type SectionData = {
  id: string;
  title: string;
  coverImage: string;
};

interface AdminSectionComponentProps {
  sectionData: SectionData;
  updateHandler: () => void;
}

const AdminSectionComponent: React.FC<AdminSectionComponentProps> = ({
  sectionData,
  updateHandler,
}) => {
  const [deleteSection] = useDeleteSectionMutation({
    refetchQueries: [{ query: GetSectionsDocument }, "GetSections"],
  });

  const deleteSectionHandler = async () => {
    const isSure = window.confirm(
      `You want to delete ${sectionData.title} section?`,
    );

    if (!isSure) return;

    const data = await deleteSection({
      variables: { deleteSectionId: +sectionData.id },
    });

    if (!data.data?.deleteSection.valueOf) {
      window.alert("Something went wrong!");
    }
  };

  return (
    <div className="shadow-lg rounded-md overflow-hidden pb-4">
      <div className="relative w-full h-[200px]">
        <Image
          src={sectionData.coverImage}
          layout="fill"
          objectFit="cover"
          alt={sectionData.title}
          priority
        />
      </div>
      <div className="mt-4 flex items-center justify-between px-6">
        <h3 className="text-center">{sectionData.title}</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer"
            onClick={updateHandler}
          >
            <Image
              src="/icons/edit.png"
              layout="fixed"
              width={25}
              height={25}
              alt="Edit"
            />
          </button>
          <button
            type="button"
            className="cursor-pointer"
            onClick={deleteSectionHandler}
          >
            <Image
              src="/icons/delete.png"
              layout="fixed"
              width={25}
              height={25}
              alt="Delete"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionComponent;
