import { useState } from "react";
import { Skills } from "../types.ts";

interface SkillsFormProps {
  onAddSkills: (skills: Skills) => void;
  onDeleteSkills: (index: number) => void;
  skillsList: Skills[];
}

const SkillsForm = ({
  onAddSkills,
  onDeleteSkills,
  skillsList,
}: SkillsFormProps) => {
  const [skill, setSkill] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skill.trim() === "") return; // Prevent empty skills from being added
    onAddSkills({ skills: skill });
    setSkill(""); // Clear input after adding
  };

  return (
    <div className="border p-3 rounded">
      <h4>Skills</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2 d-flex">
          <input
            type="text"
            name="skills"
            className="form-control me-2"
            placeholder="Enter a skill"
            value={skill}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success">
            ADD
          </button>
        </div>
      </form>

      {/* Skills List */}
      <ul className="list-group mt-2">
        {skillsList.map((skill, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {skill.skills}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleteSkills(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsForm;
