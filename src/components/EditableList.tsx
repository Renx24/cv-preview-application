import React from "react";

interface EditableListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onDelete: (index: number) => void;
  onSelectEdit: (index: number) => void; // Ensures correct typing
  editIndex: number | null;
}

const EditableList = <T,>({
  items,
  renderItem,
  onDelete,
  onSelectEdit,
  editIndex,
}: EditableListProps<T>) => {
  return (
    <div className="mt-3">
      {items.length > 0 && <h5>Added Entries</h5>}
      {items.map((item, index) => (
        <div key={index} className="border p-2 mb-2">
          {renderItem(item)}
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => onSelectEdit(index)} // Passes the correct index
          >
            {editIndex === index ? "Editing..." : "Edit"}
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default EditableList;
