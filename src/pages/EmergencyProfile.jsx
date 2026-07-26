import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function EmergencyProfile() {
      const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    medical: "",
    otherMedical: "",
    allergies: "",
    medicines: "",

    emergency1Name: "",
    emergency1Phone: "",
    emergency1Relation: "",

    emergency2Name: "",
    emergency2Phone: "",
    emergency2Relation: "",

    emergency3Name: "",
    emergency3Phone: "",
    emergency3Relation: "",

    notes: "",
  });

  useEffect(() => {
  const loadProfile = async () => {
    if (!auth.currentUser) return;

    const docRef = doc(db, "emergencyProfiles", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setForm(docSnap.data());
    }
  };

  loadProfile();
}, []);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      !form.name ||
      !form.age ||
      !form.gender ||
      !form.bloodGroup ||
      !form.phone ||
      !form.address ||
      !form.emergency1Name ||
      !form.emergency1Phone ||
      !form.emergency1Relation
    ) {
      alert("⚠ Please fill all required fields.");
      return;
    }
    try {
  await setDoc(doc(db, "emergencyProfiles",auth.currentUser.uid), form);

  alert("✅ Emergency Information Saved Successfully");
} catch (error) {
  console.error(error);
  alert("❌ Error saving information");
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
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-center text-red-500">
          Emergency Information
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Please provide accurate information. It may help during an emergency.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          👤 Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            value={form.name}
            placeholder="Full Name *"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            name="age"
            value={form.age}
            type="number"
            placeholder="Age *"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          >
            <option value="">Select Gender *</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          >
            <option value="">Blood Group *</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            name="phone"
            value={form.phone}
            placeholder="Phone Number *"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <textarea
            name="address"
            value={form.address}
            placeholder="Address *"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none md:col-span-2"
          />

        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          ❤️ Medical Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <select
            name="medical"
            value={form.medical}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none md:col-span-2"
          >
            <option value="">Medical Condition</option>
            <option>None</option>
            <option>Diabetes</option>
            <option>Asthma</option>
            <option>Heart Disease</option>
            <option>High Blood Pressure</option>
            <option>Epilepsy</option>
          </select>

          <input
            name="otherMedical"
            value={form.otherMedical}
            placeholder="Other Medical Condition"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none md:col-span-2"
          />

          <input
            name="allergies"
            value={form.allergies}
            placeholder="Allergies"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            name="medicines"
            value={form.medicines}
            placeholder="Current Medicines"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          🚨 Emergency Contacts
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            name="emergency1Name"
            value={form.emergency1Name}
            placeholder="Contact 1 Name *"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            name="emergency1Phone"
            value={form.emergency1Phone}
            placeholder="Contact 1 Phone *"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <select
            name="emergency1Relation"
            value={form.emergency1Realtion}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          >
            <option value="">Relationship *</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Husband</option>
            <option>Wife</option>
            <option>Friend</option>
            <option>Relative</option>
            <option>Guardian</option>
            <option>Other</option>
          </select>

          <input
            name="emergency2Name"
            value={form.emergency2Name}
            placeholder="Contact 2 Name"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            name="emergency2Phone"
            value={form.emergency2Phone}
            placeholder="Contact 2 Phone"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <select
            name="emergency2Relation"
            value={form.emergency2Relation}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          >
            <option value="">Relationship</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Husband</option>
            <option>Wife</option>
            <option>Friend</option>
            <option>Relative</option>
            <option>Guardian</option>
            <option>Other</option>
          </select>

          <input
            name="emergency3Name"
            value={form.emergency3Name}
            placeholder="Contact 3 Name"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <input
            name="emergency3Phone"
            value={form.emergency3Phone}
            placeholder="Contact 3 Phone"
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          />

          <select
            name="emergency3Relation"
            value={form.emergency3Relation}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 outline-none"
          >
            <option value="">Relationship</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Husband</option>
            <option>Wife</option>
            <option>Friend</option>
            <option>Relative</option>
            <option>Guardian</option>
            <option>Other</option>
          </select>

        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          📝 Additional Notes
        </h2>

        <textarea
          name="notes"
          value={form.notes}
          rows="4"
          placeholder="Additional Notes (Optional)"
          onChange={handleChange}
          className="w-full p-4 rounded-xl bg-gray-800 outline-none"
        />

        <button
          onClick={handleSave}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 py-4 rounded-xl text-xl font-bold"
        >
          💾 Save Information
        </button>

      </div>
    </div>
  );
}

export default EmergencyProfile;