import { Formik } from "formik";
import Head from "next/head";
import image from "next/image";
import React, { useState } from "react";
import {
  GetProjectsDocument,
  useAddProjectMutation,
  useGetProjectsQuery,
  useGetSectionsQuery,
} from "../../client/generated/graphql";
import AdminLayout from "../../components/AdminLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import PopupLayout from "../../components/PopupLayout";
import { uploadFile } from "../../utils/uploadAPI";

const Projects: React.FC = () => {
  const { data, loading } = useGetProjectsQuery();
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <Head>
        <title>Projects | Admin Panel</title>
      </Head>
      <AdminLayout>
        {isOpened && (
          <ProjectPopup closeHanlder={() => setIsOpened(false)} />
        )}
        <div className="flex justify-end">
          <button className="btn" onClick={() => setIsOpened(true)}>
            Add Project
          </button>
        </div>
        {loading ? (
          <LoadingSpinner size="rg" />
        ) : (
          <div className="grid gap-6 mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.getProjects.map((project) => (
              <p key={project.id}>{project.title}</p>
            ))}
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default Projects;

interface ProjectPopupProps {
  closeHanlder: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({
  closeHanlder,
}) => {
  const [addProjectMutation] = useAddProjectMutation({
    refetchQueries: [{ query: GetProjectsDocument }, "GetProjects"],
  });

  const { data, loading: sectionsLoading } = useGetSectionsQuery();

  return (
    <PopupLayout closeHanlder={closeHanlder}>
      <Formik
        initialValues={{ title: "", content: "", sectionId: "" }}
        validateOnChange={true}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.title) {
            errors.title = "This Field is required!";
          }
          if (!values.content) {
            errors.image = "This Field is required!";
          }
          return errors;
        }}
        onSubmit={async (values, { setStatus }) => {
          const { errors } = await addProjectMutation({
            variables: {
              ...values,
              sectionId: +values.sectionId,
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
            message: `Project is added successfully!`,
          });

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
                disabled={isSubmitting || status?.type === "success"}
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
              <label className="text-gray-500 mb-1">Content:</label>
              <textarea
                name="content"
                cols={10}
                className="textInput"
                value={values.content}
                disabled={isSubmitting || status?.type === "success"}
                onChange={handleChange}
              />
              {errors.content && touched.content && (
                <p className="text-red-500 text-center mt-1">
                  {errors.content}
                </p>
              )}
            </div>

            <div ref={parent as any} className="inputContainer">
              <label className="text-gray-500 mb-1">Section:</label>
              <select
                name="sectionId"
                className="textInput"
                disabled={
                  isSubmitting ||
                  status?.type === "success" ||
                  sectionsLoading
                }
                value={values.sectionId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a Section:
                </option>
                {data?.getSections.map((section) => (
                  <option value={section.id} key={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
              {errors.content && touched.content && (
                <p className="text-red-500 text-center mt-1">
                  {errors.content}
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
              disabled={
                isSubmitting ||
                isValidating ||
                status?.type === "success"
              }
            >
              {isSubmitting ? "Loading..." : "Save"}
            </button>
          </form>
        )}
      </Formik>
    </PopupLayout>
  );
};
