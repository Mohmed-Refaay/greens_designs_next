import React, { ChangeEvent, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  GetSectionsDocument,
  useAddSectionMutation,
  useGetSectionsQuery,
  useUpdateSectionMutation,
} from "../../client/generated/graphql";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PopupLayout from "../../components/PopupLayout";
import { uploadFile } from "../../utils/uploadAPI";
import { Formik } from "formik";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminSectionComponent, {
  SectionData,
} from "../../components/AdminSectionComponent";
import Head from "next/head";

const Sections: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { data, loading } = useGetSectionsQuery();
  const [selectedSection, setSelectedSection] =
    useState<SectionData | null>(null);

  const handleOpenPopup = (data?: SectionData) => {
    if (data) {
      setSelectedSection(data);
    }
    setIsOpened(true);
  };

  const handleClosePopup = () => {
    if (selectedSection) setSelectedSection(null);
    setIsOpened(false);
  };

  return (
    <>
      <Head>
        <title>Sections | Admin Panel</title>
      </Head>
      <AdminLayout>
        {isOpened && (
          <SectionPopup
            data={selectedSection}
            closeHanlder={handleClosePopup}
          />
        )}
        <div className="flex justify-end">
          <button className="btn" onClick={() => handleOpenPopup()}>
            Add Section
          </button>
        </div>
        <div>
          {loading ? (
            <LoadingSpinner size="rg" />
          ) : (
            <div className="grid gap-6 mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data?.getSections.map((section) => (
                <AdminSectionComponent
                  key={section.id}
                  sectionData={section}
                  updateHandler={() => {
                    handleOpenPopup(section);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default Sections;

interface SectionPopupProps {
  closeHanlder: () => void;
  data?: SectionData | null;
}

const SectionPopup: React.FC<SectionPopupProps> = ({
  closeHanlder,
  data,
}) => {
  const [parent] = useAutoAnimate();
  const [addSection] = useAddSectionMutation({
    refetchQueries: [{ query: GetSectionsDocument }, "GetSections"],
  });
  const [updateSection] = useUpdateSectionMutation({
    refetchQueries: [{ query: GetSectionsDocument }, "GetSections"],
  });

  const [image, setImage] = useState<File | null>(null);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(() => (e.target.files ? e.target.files[0] : null));
  };

  return (
    <PopupLayout closeHanlder={closeHanlder}>
      <Formik
        initialValues={{ title: data?.title || "", image: "" }}
        validateOnChange={true}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.title) {
            errors.title = "This Field is required!";
          }
          if (!image && !data?.coverImage) {
            errors.image = "This Field is required!";
          }
          return errors;
        }}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting },
        ) => {
          let imageData: any;
          if (image) {
            imageData = await uploadFile(image as File);
          }

          if (
            image &&
            (!imageData ||
              !imageData.url ||
              imageData.url.length <= 0)
          ) {
            setErrors({ image: "Image upload faild!" });
            return;
          }

          let errors;
          if (data) {
            const { errors: updateSectionErrors } =
              await updateSection({
                variables: {
                  updateSectionId: data.id,
                  coverImage: image
                    ? imageData.url[0]
                    : data.coverImage,
                  title: values.title,
                },
              });

            errors = updateSectionErrors;
          } else {
            const { errors: addSectionErrors } = await addSection({
              variables: {
                title: values.title,
                coverImage: imageData.url[0],
              },
            });
            errors = addSectionErrors;
          }

          if (errors) {
            setStatus({
              type: "error",
              message: "Something went wrong!",
            });
            return;
          }

          setStatus({
            type: "success",
            message: `Section is ${
              data ? "updated" : "added"
            } successfully!`,
          });
          setSubmitting(false);

          setTimeout(() => {
            closeHanlder();
          }, 2300);
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          isSubmitting,
          isValidating,
          touched,
          errors,
          status,
        }) => (
          <form ref={parent as any} onSubmit={handleSubmit}>
            <div ref={parent as any} className="inputContainer">
              <label className="text-gray-500">Title:</label>
              <input
                type="text"
                name="title"
                className="textInput"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-center mt-1">
                  {errors.title}
                </p>
              )}
            </div>
            <div ref={parent as any} className="inputContainer">
              <label className="text-gray-500 mb-1">
                {data && "Update"} Cover Image:
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => {
                  changeImageHandler(e);
                }}
              />
              {errors.image && touched.image && (
                <p className="text-red-500 text-center mt-1">
                  {errors.image}
                </p>
              )}
            </div>
            {status && (
              <p
                className={`${
                  status?.type === "error"
                    ? "text-red-500"
                    : "text-green-400"
                } text-center mt-3`}
              >
                {status.message}
              </p>
            )}
            <button
              className="mt-8 btn"
              type="submit"
              disabled={isSubmitting || isValidating}
            >
              {isSubmitting ? "Loading..." : "Save"}
            </button>
          </form>
        )}
      </Formik>
    </PopupLayout>
  );
};
