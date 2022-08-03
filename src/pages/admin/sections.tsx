import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { useGetSectionsQuery } from "../../client/generated/graphql";

const Sections: React.FC = ({}) => {
  const { data } = useGetSectionsQuery();

  return (
    <AdminLayout title="Sections">
      <div>
        {data?.getSections.map((section) => (
          <div key={section.id}>
            <h3>{section.title}</h3>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Sections;
