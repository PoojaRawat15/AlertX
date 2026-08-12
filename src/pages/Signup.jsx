import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("");
  const [name, setName] = useState("");

  // Email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Phone
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // EMAIL SIGNUP
  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);

      alert(
        "📧 Verification link has been sent to your email. Please verify your email before logging in."
      );

      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // SETUP RECAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        }
      );
    }

    return window.recaptchaVerifier;
  };

  // SEND PHONE OTP
  const sendOTP = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    try {
      setLoading(true);

      const appVerifier = setupRecaptcha();

      const formattedPhone = phone.startsWith("+")
        ? phone
        : `+91${phone}`;

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      setConfirmationResult(confirmation);
      setOtpSent(true);

      alert("📱 OTP sent successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message);

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  // VERIFY PHONE OTP
  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      setLoading(true);

      await confirmationResult.confirm(otp);

      alert("🎉 Phone verified and account created successfully!");

      navigate("/Dashboard");
    } catch (error) {
      alert("❌ Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-red-500 text-lg font-semibold"
      >
        ← Back
      </button>

      <div className="w-full max-w-md bg-gray-900 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Join AlertX today
        </p>

        {/* METHOD SELECTION */}

        {!method && (
          <div className="mt-8 space-y-4">

            <p className="text-white text-center text-lg">
              How would you like to create your account?
            </p>

            <button
              onClick={() => setMethod("email")}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
            >
              📧 Continue with Email
            </button>

            <button
              onClick={() => setMethod("phone")}
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold"
            >
              📱 Continue with Phone
            </button>

          </div>
        )}

        {/* EMAIL SIGNUP */}

        {method === "email" && (
          <form onSubmit={handleEmailSignup} className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none"
            />

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
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <button
              type="button"
              onClick={() => setMethod("")}
              className="w-full text-gray-400 hover:text-white"
            >
              ← Choose another method
            </button>

          </form>
        )}

        {/* PHONE SIGNUP */}

        {method === "phone" && (
          <div className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none"
            />

            {!otpSent && (
              <>
                <div id="recaptcha-container"></div>

                <button
                  onClick={sendOTP}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </>
            )}

            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none"
                />

                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => {
                setMethod("");
                setOtpSent(false);
                setOtp("");
              }}
              className="w-full text-gray-400 hover:text-white"
            >
              ← Choose another method
            </button>

          </div>
        )}

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}

export default Signup;