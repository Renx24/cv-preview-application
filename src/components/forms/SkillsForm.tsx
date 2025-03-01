import { useState } from "react";
import { Skills } from "../types.ts";
import EditableList from "../EditableList.tsx";

interface SkillsFormProps {
  onAddSkills: (skills: Skills) => void;
  onUpdateSkills: (index: number, skills: Skills) => void;
  onDeleteSkills: (index: number) => void;
  skillsList: Skills[];
}

const SkillsForm = ({
  onAddSkills,
  onUpdateSkills,
  onDeleteSkills,
  skillsList,
}: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skills>({
    skills: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      onUpdateSkills(editIndex, skills);
      setEditIndex(null);
    } else {
      onAddSkills(skills);
    }
    setSkills({ skills: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border p-3 rounded">
        <h4>Skills</h4>
        <div className="mb-2">
          <input
            type="text"
            name="skills"
            className="form-control"
            placeholder="Skills"
            value={skills.skills}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <EditableList<Skills>
        items={skillsList}
        renderItem={(skills) => (
          <>
            <h5>Skills</h5>
            <p>{skills.skills}</p>
          </>
        )}
        onDelete={onDeleteSkills}
        onSelectEdit={(index) => {
          setSkills({ ...skillsList[index] });
          setEditIndex(index);
        }}
        editIndex={editIndex}
      />
    </>
  );
};

export default SkillsForm;
