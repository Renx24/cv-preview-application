import { Contact, Profile, Employment, Education, Skills } from "./types";
import {
  PhoneIcon,
  LocationIcon,
  EmailIcon,
  LinkedinIcon,
  GithubIcon,
} from "../assets/icons";

interface PreviewProps {
  contactList: Contact[];
  profileList: Profile[];
  employmentList: Employment[];
  educationList: Education[];
  skillList: Skills[];
}

type ContactInfoProps = {
  label: string;
  icon: any;
  value: string | undefined;
};

const ContactInfo = ({ label, icon: Icon, value }: ContactInfoProps) => {
  if (!value) return null;
  return (
    <>
      <Icon label={label} icon={Icon} />
      <>
        {" "}
        {value.startsWith("github") ||
        value.startsWith("https://github.com") ? (
          <a target="_blank" href={value}>
            {value}
          </a>
        ) : value.startsWith("linkedin") ||
          value.startsWith("https://linkedin.com") ? (
          <a target="_blank" href={value}>
            {value}
          </a>
        ) : (
          value
        )}
      </>
      <br />
    </>
  );
};

const Preview = ({
  educationList,
  contactList,
  employmentList,
  profileList,
  skillList,
}: PreviewProps) => {
  return (
    <>
      <div className="border p-3 cv-preview">
        {contactList.map((contact, index) => (
          <div
            key={index}
            className="border-bottom p-4 mb-2 row align-items-center"
          >
            <div className="col full-name text-center ">
              {contact.fullName.toUpperCase()}
            </div>
            <div className="col align-self-center">
              <p>
                <ContactInfo
                  label="Phone"
                  icon={PhoneIcon}
                  value={contact.phoneNumber}
                />
                <ContactInfo
                  label="Email"
                  icon={EmailIcon}
                  value={contact.email}
                />
                <ContactInfo
                  label="Location"
                  icon={LocationIcon}
                  value={contact.location}
                />
                <ContactInfo
                  label="Linkedin"
                  icon={LinkedinIcon}
                  value={contact.linkedin}
                />
                <ContactInfo
                  label="Github"
                  icon={GithubIcon}
                  value={contact.github}
                />
              </p>
            </div>
          </div>
        ))}

        {profileList.map((profile, index) => (
          <div key={index} className="border-bottom pb-2 mb-2">
            <h6 className="pt-2">
              <u>Profile</u>
            </h6>
            <p>{profile.profile}</p>
          </div>
        ))}

        {employmentList.map((employment, index) => (
          <div key={index} className="border-bottom pb-2 mb-2">
            <h6 className="pt-2">
              <u>Employment history</u>
            </h6>
            <strong>{employment.company}</strong> ({employment.fromDate} -{" "}
            {employment.toDate})
            <p>
              <i>{employment.position}</i>
            </p>
            {employment.achievements && (
              <>
                {employment.achievements} <br />
              </>
            )}
            {employment.responsibilities}
          </div>
        ))}

        {educationList.map((edu, index) => (
          <div key={index} className="border-bottom pb-2 mb-2">
            <h6 className="pt-2">
              <u>Education</u>
            </h6>
            <strong>{edu.school}</strong> ({edu.fromDate} - {edu.toDate})
            <p>{edu.field}</p>
          </div>
        ))}

        {skillList.length > 0 && (
          <div className="pb-2 mb-2">
            <h6 className="pt-2">
              <u>Skills:</u>
            </h6>
            <ul>
              {skillList.map((skill, index) => (
                <li key={index}>{skill.skills}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;
