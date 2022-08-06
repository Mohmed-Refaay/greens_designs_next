import React, { ChangeEvent, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  GetSectionsDocument,
  useAddSectionMutation,
  useGetSectionsQuery,
} from "../../client/generated/graphql";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import PopupLayout from "../../components/PopupLayout";
import { uploadFile } from "../../utils/uploadAPI";
import { Formik } from "formik";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminSectionComponent from "../../components/AdminSectionComponent";

const Sections: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { data, loading } = useGetSectionsQuery();

  return (
    <AdminLayout>
      {isOpened && (
        <SectionPopup closeHanlder={() => setIsOpened(false)} />
      )}
      <div className="flex justify-end">
        <button className="btn" onClick={() => setIsOpened(true)}>
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
                id={section.id}
                title={section.title}
                coverImage={section.coverImage}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Sections;

interface SectionPopupProps {
  closeHanlder: () => void;
}

const SectionPopup: React.FC<SectionPopupProps> = ({
  closeHanlder,
}) => {
  const [parent] = useAutoAnimate();
  const [mutate] = useAddSectionMutation({
    refetchQueries: [{ query: GetSectionsDocument }, "GetSections"],
  });
  const [image, setImage] = useState<File | null>(null);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(() => (e.target.files ? e.target.files[0] : null));
  };

  return (
    <PopupLayout closeHanlder={closeHanlder}>
      <Formik
        initialValues={{ title: "", image: "" }}
        validateOnChange={true}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.title) {
            errors.title = "This Field is required!";
          }
          if (!image) {
            errors.image = "This Field is required!";
          }
          return errors;
        }}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting },
        ) => {
          const data = await uploadFile(image as File);

          if (!data || !data.url || data.url.length <= 0) {
            setErrors({ image: "Image upload faild!" });
            return;
          }

          const { errors } = await mutate({
            variables: {
              title: values.title,
              coverImage: data.url[0],
            },
          });

          if (errors) {
            setStatus({
              type: "error",
              message: "Something went wrong!",
            });
            return;
          }

          setStatus({
            type: "success",
            message: "Section is added successfully!",
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
                Cover Image:
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
