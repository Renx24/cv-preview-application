import { useState } from "react";
import { Contact } from "../types.ts";
import EditableList from "../EditableList.tsx";

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
  onUpdateContact: (index: number, contact: Contact) => void;
  onDeleteContact: (index: number) => void;
  contactList: Contact[];
}

const ContactForm = ({
  onAddContact,
  onUpdateContact,
  onDeleteContact,
  contactList,
}: ContactFormProps) => {
  const [contact, setContact] = useState<Contact>({
    fullName: "",
    phoneNumber: "",
    email: "",
    location: "",
    linkedin: "",
    github: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null) {
      onUpdateContact(editIndex, contact);
      setEditIndex(null);
    } else {
      onAddContact(contact);
    }
    setContact({
      fullName: "",
      phoneNumber: "",
      email: "",
      location: "",
      linkedin: "",
      github: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border p-3 rounded">
        <h4>Contact</h4>
        <div className="mb-2">
          <input
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Full name"
            value={contact.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            placeholder="Phone number"
            value={contact.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Location (Country, State, City)"
            value={contact.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="linkedin"
            className="form-control"
            placeholder="LinkedIn (optional)"
            value={contact.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="github"
            className="form-control"
            placeholder="Github (optional)"
            value={contact.github}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <EditableList<Contact>
        items={contactList}
        renderItem={(contact) => (
          <>
            <p>
              {contact.fullName}
              <br />
              {contact.phoneNumber}
              <br />
              {contact.email}
              <br />
              {contact.location}
              <br />
              <>
                {contact.linkedin && (
                  <a href={contact.linkedin}>
                    {contact.linkedin} <br />
                  </a>
                )}
              </>
              <>
                {contact.github && (
                  <a href={contact.github}>
                    {contact.github} <br />
                  </a>
                )}
              </>
            </p>
          </>
        )}
        onDelete={onDeleteContact}
        onSelectEdit={(index) => {
          setContact({ ...contactList[index] });
          setEditIndex(index);
        }}
        editIndex={editIndex}
      />
    </div>
  );
};

export default ContactForm;
