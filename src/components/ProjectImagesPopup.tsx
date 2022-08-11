import NextImage from "next/image";
import React, { ChangeEvent, useState } from "react";
import {
  GetProjectsDocument,
  Image,
  useDeleteProjectImageMutation,
} from "../client/generated/graphql";
import PopupLayout from "./PopupLayout";
import { useAddProjectImageMutation } from "../client/generated/graphql";
import { uploadFile } from "../utils/uploadAPI";
import LoadingSpinner from "./LoadingSpinner";

interface ProjectImagesPopupProps {
  closeHandler: () => void;
  projectImages: Image[];
  projectTitle: string;
  projectId: number;
}

const ProjectImagesPopup: React.FC<ProjectImagesPopupProps> = ({
  closeHandler,
  projectImages,
  projectTitle,
  projectId,
}) => {
  const [loading, setLoading] = useState(false);

  const [addImage, {}] = useAddProjectImageMutation({
    refetchQueries: [{ query: GetProjectsDocument }, "GetProjects"],
  });

  const [deleteImage, { loading: deleteImageLoading }] =
    useDeleteProjectImageMutation({
      refetchQueries: [{ query: GetProjectsDocument }, "GetProjects"],
    });

  const onChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return;

    const data = await uploadFile([e.target.files[0]]);

    if (!data) return;

    addImage({
      variables: {
        projectId,
        url: data[0],
      },
    });
  };

  return (
    <PopupLayout closeHanlder={closeHandler}>
      <h3 className="mb-3">Images of {projectTitle}:</h3>
      <div className="grid grid-cols-2 gap-3">
        {projectImages.map((image) => (
          <div
            key={image.id}
            className="relative w-full h-[150px] rounded-lg overflow-hidden group transition"
          >
            {deleteImageLoading ? (
              <LoadingSpinner minHeight={150} size="sm" />
            ) : (
              <>
                <div
                  className="z-30 absolute transition opacity-0 bg-red-400/70 w-full h-full flex items-center justify-center font-semibold text-white group-hover:opacity-100 duration-500 cursor-pointer"
                  onClick={() =>
                    deleteImage({
                      variables: { deleteProjectImageId: +image.id },
                    })
                  }
                >
                  Delete
                </div>

                <NextImage
                  src={image.url}
                  objectFit="cover"
                  alt={projectTitle + image.id}
                  layout="fill"
                />
              </>
            )}
          </div>
        ))}
        <label
          htmlFor="image-upload"
          className={`${
            loading && "opacity-25"
          } w-full h-[150px] flex justify-center items-center ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          } border-gray-300 border rounded-lg`}
        >
          <input
            id="image-upload"
            className="hidden"
            disabled={loading}
            type="file"
            accept="image/*"
            onChange={async (e) => {
              setLoading(true);
              await onChangeHandler(e);
              setLoading(false);
            }}
          />

          {loading ? (
            <LoadingSpinner minHeight={150} size="sm" />
          ) : (
            <NextImage
              src={"/icons/add-image.png"}
              objectFit="cover"
              alt="add image"
              layout="fixed"
              width={35}
              height={35}
            />
          )}
        </label>
      </div>
    </PopupLayout>
  );
};

export default ProjectImagesPopup;
