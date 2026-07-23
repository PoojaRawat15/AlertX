import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmergencyProfile from "./pages/EmergencyProfile";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import Location from "./pages/Location";
import Settings from "./pages/Settings";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <h1 className="text-white text-center mt-10">Loading...</h1>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/Dashboard" /> : <Home />}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/Dashboard" /> : <Login />}
      />

      <Route
        path="/signup"
        element={user ? <Navigate to="/Dashboard" /> : <Signup />}
      />

      <Route
        path="/Dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/SOS"
        element={user ? <SOS /> : <Navigate to="/login" />}
      />

      <Route
        path="/Location"
        element={user ? <Location /> : <Navigate to="/login" />}
      />

      <Route
        path="/emergency-profile"
        element={user ? <EmergencyProfile /> : <Navigate to="/login" />}
      />

      <Route
        path="/settings"
        element={user ? <Settings /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;