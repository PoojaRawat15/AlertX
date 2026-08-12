import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  reload,
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await reload(user);

      if (!user.emailVerified) {
        alert(
          "📧 Please verify your email first. Check your inbox for the verification link."
        );
        return;
      }

      navigate("/Dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-red-500"
      >
        ← Back
      </button>

      <div className="w-full max-w-md bg-gray-900 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Login to AlertX
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Create your account
          </span>
        </p>

      </div>
      
      </div>
   
  );
}

export default Login;