import { Formik } from "formik";
import Head from "next/head";
import image from "next/image";
import React, { useState } from "react";
import {
  GetProjectsDocument,
  Project,
  useAddProjectMutation,
  useGetProjectsQuery,
  useGetSectionsQuery,
  useUpdateProjectMutation,
} from "../../client/generated/graphql";
import AdminLayout from "../../components/AdminLayout";
import AdminProjectComponent from "../../components/AdminProjectComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import PopupLayout from "../../components/PopupLayout";
import { uploadFile } from "../../utils/uploadAPI";

const Projects: React.FC = () => {
  const { data, loading } = useGetProjectsQuery();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const handleOpenPopup = (data?: Project) => {
    if (data) {
      setSelectedProject(data);
    }
    setIsOpened(true);
  };

  const handleClosePopup = () => {
    if (selectedProject) setSelectedProject(null);
    setIsOpened(false);
  };

  return (
    <>
      <Head>
        <title>Projects | Admin Panel</title>
      </Head>
      <AdminLayout>
        {isOpened && (
          <ProjectPopup
            data={selectedProject}
            closeHanlder={handleClosePopup}
          />
        )}
        <div className="flex justify-end">
          <button className="btn" onClick={() => handleOpenPopup()}>
            Add Project
          </button>
        </div>
        {loading ? (
          <LoadingSpinner size="rg" />
        ) : (
          <div className="grid gap-6 mt-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.getProjects.map((project) => (
              <AdminProjectComponent
                key={project.id}
                projectData={project as Project}
                updateHandler={() =>
                  handleOpenPopup(project as Project)
                }
              />
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
  data?: Project | null;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({
  closeHanlder,
  data: projectData,
}) => {
  const [addProjectMutation] = useAddProjectMutation({
    refetchQueries: [{ query: GetProjectsDocument }, "GetProjects"],
  });

  const [updateProjectMutation] = useUpdateProjectMutation({
    refetchQueries: [{ query: GetProjectsDocument }, "GetProjects"],
  });

  const { data, loading: sectionsLoading } = useGetSectionsQuery();

  return (
    <PopupLayout closeHanlder={closeHanlder}>
      <Formik
        initialValues={{
          title: projectData?.title || "",
          content: projectData?.content || "",
          sectionId: projectData?.section.id || "",
        }}
        validateOnChange={true}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.title) {
            errors.title = "This Field is required!";
          }
          if (!values.content) {
            errors.content = "This Field is required!";
          }
          if (!values.sectionId) {
            errors.sectionId = "This Field is required!";
          }
          return errors;
        }}
        onSubmit={async (values, { setStatus }) => {
          let errors;
          if (projectData) {
            const { errors: updateProjectErrors } =
              await updateProjectMutation({
                variables: {
                  ...values,
                  updateProjectId: +projectData.id,
                  sectionId: +values.sectionId,
                },
              });
            errors = updateProjectErrors;
          } else {
            const { errors: addProjectErrors } =
              await addProjectMutation({
                variables: {
                  ...values,
                  sectionId: +values.sectionId,
                },
              });

            errors = addProjectErrors;
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
            <div className="inputContainer">
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
              {errors.sectionId && touched.sectionId && (
                <p className="text-red-500 text-center mt-1">
                  {errors.sectionId}
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
