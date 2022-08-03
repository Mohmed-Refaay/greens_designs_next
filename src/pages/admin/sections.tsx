import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useGetSectionsQuery } from "../../client/generated/graphql";
import PopupLayout from "../../components/PopupLayout";

const Sections: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useGetSectionsQuery();

  return (
    <AdminLayout title="Sections">
      {isOpened && (
        <PopupLayout closeHanlder={() => setIsOpened(false)}>
          <div></div>
        </PopupLayout>
      )}
      <div className="flex justify-end">
        <button
          className="border-green-500 border-2 rounded-lg px-3 py-1 cursor-pointer"
          onClick={() => setIsOpened(true)}
        >
          Add Section
        </button>
      </div>
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
