import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import AccountSecurity from "../components/AccountSettings";
import Notification from "../components/Notification";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <ProfileForm />
            <AccountSecurity />
          </div>
        );

      case "notifications":
        return (
          <div>
            <Notification />
          </div>
        );
      case "security":
        return <div>Security Settings</div>;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <h3 className="text-primary font-normal text-4xl my-8">Settings</h3>

      {/* Tabs */}
      <div className="flex gap-4 pb-2">
        {["profile", "notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-6 py-3 text-sm rounded ${
              activeTab === tab ? "bg-primary text-white" : "bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Settings;
