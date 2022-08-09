import React from "react";
import { Project } from "../client/generated/graphql";
import Image from "next/image";
import {
  useDeleteProjectMutation,
  GetProjectsDocument,
} from "../client/generated/graphql";

interface AdminProjectComponentProps {
  updateHandler: () => void;
  projectData: Project;
}

const AdminProjectComponent: React.FC<AdminProjectComponentProps> = ({
  updateHandler,
  projectData,
}) => {
  const [deleteProject] = useDeleteProjectMutation({
    refetchQueries: [{ query: GetProjectsDocument }, "GetProjects"],
  });

  const deleteSectionHandler = async () => {
    const isSure = window.confirm(
      `You want to delete ${projectData.title} project?`,
    );

    if (!isSure) return;

    const data = await deleteProject({
      variables: { deleteProjectId: +projectData.id },
    });

    if (!data.data?.deleteProject.valueOf()) {
      window.alert("Something went wrong!");
    }
  };

  return (
    <div className="shadow-lg rounded-md overflow-hidden pb-4">
      <div className="relative w-full h-[200px]">
        <Image
          src={
            projectData.coverImage
              ? projectData.coverImage.url
              : "/images/noImage.jpeg"
          }
          layout="fill"
          objectFit="cover"
          alt={projectData.title}
          priority
        />
      </div>
      <div className="mt-4 flex items-center justify-between px-6">
        <h3 className="text-center">
          {projectData.section.title}: {projectData.title}
        </h3>
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

export default AdminProjectComponent;
