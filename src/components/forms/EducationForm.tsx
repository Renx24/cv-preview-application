import { useState } from "react";
import { Education } from "../types.ts";
import EditableList from "../EditableList.tsx";

interface EducationFormProps {
  onAddEducation: (education: Education) => void;
  onUpdateEducation: (index: number, education: Education) => void;
  onDeleteEducation: (index: number) => void;
  educationList: Education[];
}

const EducationForm: React.FC<EducationFormProps> = ({
  onAddEducation,
  onUpdateEducation,
  onDeleteEducation,
  educationList,
}) => {
  const [education, setEducation] = useState<Education>({
    school: "",
    field: "",
    fromDate: "",
    toDate: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      onUpdateEducation(editIndex, education);
      setEditIndex(null);
    } else {
      onAddEducation(education);
    }
    setEducation({ school: "", field: "", fromDate: "", toDate: "" }); // Reset input fields
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border p-3 rounded">
        <h4>Education</h4>
        <div className="mb-2">
          <input
            type="text"
            name="school"
            className="form-control"
            placeholder="Name of school, location"
            value={education.school}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="field"
            className="form-control"
            placeholder="Field of study"
            value={education.field}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex gap-2">
          <input
            type="text"
            name="fromDate"
            className="form-control"
            placeholder="From (year)"
            value={education.fromDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="toDate"
            className="form-control"
            placeholder="To (year)"
            value={education.toDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <EditableList<Education>
        items={educationList}
        renderItem={(edu) => (
          <>
            <strong>{edu.school}</strong> ({edu.fromDate} - {edu.toDate})
            <p>{edu.field}</p>
          </>
        )}
        onDelete={onDeleteEducation}
        onSelectEdit={(index) => {
          setEducation({ ...educationList[index] });
          setEditIndex(index);
        }}
        editIndex={editIndex}
      />
    </div>
  );
};

export default EducationForm;
