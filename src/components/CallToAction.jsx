import { useNavigate } from "react-router-dom";
function CallToAction() {
  const navigate = useNavigate();
  return (
    <section id="contact" className="py-24 px-6 bg-black text-center">

      <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900/40 to-slate-900 border-blue-800/30 p-12 text-center">

        <h2 className="text-5xl font-bold">
          Ready to Stay <span className="text-red-500">Safe?</span>
        </h2>

        <p className="text-gray-400 text-xl mt-6">
          Join AlertX today and create your emergency profile.
          Stay prepared and help your loved ones respond faster
          when every second matters.
        </p>

       <button
  onClick={() => navigate("/signup")}
  className="mt-10 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-lg transition"
>
  Create Your Account
</button>

      </div>

    </section>
  );
}

export default CallToAction;