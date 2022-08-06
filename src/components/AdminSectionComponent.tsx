import React from "react";
import Image from "next/image";
import {
  GetSectionsDocument,
  useDeleteSectionMutation,
} from "../client/generated/graphql";

interface AdminSectionComponentProps {
  id: string;
  title: string;
  coverImage: string;
}

const AdminSectionComponent: React.FC<AdminSectionComponentProps> = ({
  id,
  title,
  coverImage,
}) => {
  const [deleteSection] = useDeleteSectionMutation({
    refetchQueries: [{ query: GetSectionsDocument }, "GetSections"],
  });

  const deleteSectionHandler = async () => {
    const isSure = window.confirm(
      `You want to delete ${title} section?`,
    );

    if (!isSure) return;

    const data = await deleteSection({
      variables: { deleteSectionId: +id },
    });

    if (!data.data?.deleteSection.valueOf) {
      window.alert("Something went wrong!");
    }
  };

  return (
    <div className="shadow-lg rounded-md overflow-hidden pb-4">
      <div className="relative w-full h-[200px]">
        <Image
          src={`/uploads/${coverImage}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-4 flex items-center justify-between px-6">
        <h3 className="text-center">{title}</h3>
        <div>
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
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionComponent;
