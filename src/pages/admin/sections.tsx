import React, { ChangeEvent, FormEvent, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  useAddSectionMutation,
  useGetSectionsQuery,
} from "../../client/generated/graphql";
import PopupLayout from "../../components/PopupLayout";
import { uploadFile } from "../../utils/uploadAPI";

const Sections: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { data } = useGetSectionsQuery();

  return (
    <AdminLayout title="Sections">
      {isOpened && (
        <SectionPopup closeHanlder={() => setIsOpened(false)} />
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

interface SectionPopupProps {
  closeHanlder: () => void;
}

interface StateTypes {
  title: string;
  image: File | null;
}

const SectionPopup: React.FC<SectionPopupProps> = ({
  closeHanlder,
}) => {
  const [mutate] = useAddSectionMutation();
  const [state, setState] = useState<StateTypes>({
    title: "",
    image: null,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files
        ? e.target.files[0]
        : e.target.value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!state.image) return;
    const data = await uploadFile(state.image);

    if (!data || data.url.length <= 0) {
      console.log("image upload error");
      return;
    }

    const mutation = await mutate({
      variables: {
        title: state.title,
        coverImage: data.url[0],
      },
    });

    console.log(mutation.data?.addSection);
  };

  return (
    <PopupLayout closeHanlder={closeHanlder}>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col mb-4">
          <label>Title:</label>
          <input
            type="text"
            value={state.title}
            name="title"
            required
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            required
            type="file"
            accept="image/*"
            name="image"
            onChange={changeHandler}
          />
        </div>
        <button className="mt-8">Save</button>
      </form>
    </PopupLayout>
  );
};
