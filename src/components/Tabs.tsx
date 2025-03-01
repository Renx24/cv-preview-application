interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs = [
    "Contact",
    "Profile",
    "Employment history",
    "Education",
    "Skills",
  ];

  return (
    <div className="d-flex gap-2 mb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`btn ${
            activeTab === tab ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
