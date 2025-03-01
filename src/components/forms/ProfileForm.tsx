import { useState } from "react";
import { Profile } from "../types.ts";
import EditableList from "../EditableList.tsx";

interface ProfileFormProps {
  onAddProfile: (profile: Profile) => void;
  onUpdateProfile: (index: number, profile: Profile) => void;
  onDeleteProfile: (index: number) => void;
  profileList: Profile[];
}

const ProfileForm = ({
  onAddProfile,
  onUpdateProfile,
  onDeleteProfile,
  profileList,
}: ProfileFormProps) => {
  const [profile, setProfile] = useState<Profile>({
    profile: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      onUpdateProfile(editIndex, profile);
      setEditIndex(null);
    } else {
      onAddProfile(profile);
    }
    setProfile({ profile: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-3 rounded">
        <h4>Profile</h4>
        <div className="mb-2">
          <textarea
            name="profile"
            className="form-control"
            placeholder="Tell your potential employer a little bit about yourself"
            value={profile.profile}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success mt-2">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <EditableList<Profile>
        items={profileList}
        renderItem={(profile) => (
          <>
            <h5>Profile</h5>
            <p>{profile.profile}</p>
          </>
        )}
        onDelete={onDeleteProfile}
        onSelectEdit={(index) => {
          setProfile({ ...profileList[index] });
          setEditIndex(index);
        }}
        editIndex={editIndex}
      />
    </>
  );
};

export default ProfileForm;
