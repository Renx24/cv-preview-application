import { useState } from "react";
import Tabs from "./components/Tabs";
import EducationForm from "./components/forms/EducationForm";
import ProfileForm from "./components/forms/ProfileForm";
import ContactForm from "./components/forms/ContactForm";
import EmploymentForm from "./components/forms/EmploymentForm";
import SkillsForm from "./components/forms/SkillsForm";
import Preview from "./components/Preview";
import {
  Contact,
  Profile,
  Employment,
  Education,
  Skills,
} from "./components/types";
import useListState from "./hooks/useListState";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("Contact");

  const educationState = useListState<Education>();
  const employmentState = useListState<Employment>();
  const profileState = useListState<Profile>();
  const contactState = useListState<Contact>();
  const skillsState = useListState<Skills>();

  return (
    <div className="container mt-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="row">
        <div className="col-md-6">
          {activeTab === "Contact" && (
            <ContactForm
              onAddContact={contactState.addItem}
              onUpdateContact={contactState.updateItem}
              onDeleteContact={contactState.deleteItem}
              contactList={contactState.list}
            />
          )}
          {activeTab === "Profile" && (
            <ProfileForm
              onAddProfile={profileState.addItem}
              onUpdateProfile={profileState.updateItem}
              onDeleteProfile={profileState.deleteItem}
              profileList={profileState.list}
            />
          )}
          {activeTab === "Employment history" && (
            <EmploymentForm
              onAddEmployment={employmentState.addItem}
              onUpdateEmployment={employmentState.updateItem}
              onDeleteEmployment={employmentState.deleteItem}
              employmentList={employmentState.list}
            />
          )}
          {activeTab === "Education" && (
            <EducationForm
              onAddEducation={educationState.addItem}
              onUpdateEducation={educationState.updateItem}
              onDeleteEducation={educationState.deleteItem}
              educationList={educationState.list}
            />
          )}
          {activeTab === "Skills" && (
            <SkillsForm
              onAddSkills={skillsState.addItem}
              onUpdateSkills={skillsState.updateItem}
              onDeleteSkills={skillsState.deleteItem}
              skillsList={skillsState.list}
            />
          )}
        </div>

        <div className="col-md-6">
          <Preview
            educationList={educationState.list}
            contactList={contactState.list}
            profileList={profileState.list}
            employmentList={employmentState.list}
            skillList={skillsState.list}
          />
        </div>
      </div>
      <footer>
        Made by{" "}
        <a target="_blank" href="https://github.com/Renx24">
          renx24
        </a>
      </footer>
    </div>
  );
};

export default App;
