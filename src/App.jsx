import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmergencyProfile from "./pages/EmergencyProfile";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import Location from "./pages/Location";
import Settings from "./pages/Settings";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/emergency-profile" element={<EmergencyProfile />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/SOS" element={<SOS />} />
      <Route path="/Location" element={<Location />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;