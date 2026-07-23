import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Settings() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-red-500 text-lg font-semibold"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-center">
          ⚙️ Settings
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Manage your AlertX preferences
        </p>

        {/* Account */}
        <div className="bg-gray-900 rounded-3xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            👤 Account
          </h2>

          <p className="py-2 border-b border-gray-700">
            My Profile
          </p>

          <p className="py-2 border-b border-gray-700">
            Email
          </p>

          <p className="py-2 text-gray-400">
            Change Password (Coming Soon)
          </p>

        </div>

        {/* Language */}
        <div className="bg-gray-900 rounded-3xl p-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            🌐 Language
          </h2>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-800 p-4 rounded-xl"
          >
            <option>English</option>
            <option>Hindi</option>
          </select>

        </div>

        {/* Notifications */}
        <div className="bg-gray-900 rounded-3xl p-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            🔔 Notifications
          </h2>

          <label className="flex justify-between py-3">
            SOS Notifications
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex justify-between py-3">
            Emergency Alerts
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex justify-between py-3">
            Accident Detection Alerts
            <input type="checkbox" defaultChecked />
          </label>

        </div>

        {/* Privacy */}
        <div className="bg-gray-900 rounded-3xl p-6 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            🔒 Privacy
          </h2>

          <label className="flex justify-between py-3">
            Share Medical Information During SOS
            <input type="checkbox" defaultChecked />
          </label>

          <label className="flex justify-between py-3">
            Auto Share Location During SOS
            <input type="checkbox" defaultChecked />
          </label>

        </div>

        {/* About */}
        <div className="bg-gray-900 rounded-3xl p-6 mt-6">

          <h2 className="text-2xl font-bold mb-3">
            ℹ️ About AlertX
          </h2>

          <p>Version 1.0.0</p>

          <p className="text-gray-400 mt-2">
            Built with ❤️ using React + Firebase
          </p>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 py-4 rounded-xl text-xl font-bold"
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Settings;