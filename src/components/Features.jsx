function Features() {
  return (
    <section id="features" className="py-20 px-8 bg-gradient-to-b from-black via-gray-950 to-black">
      <h2 className="text-4xl font-bold text-center mb-12">
        Why Choose <span className="text-red-500">AlertX</span>?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold">🚨 Accident Detection</h3>
          <p className="mt-3 text-gray-300">
            Detects accidents and triggers emergency alerts.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold">📍 Live Location</h3>
          <p className="mt-3 text-gray-300">
            Shares live location with emergency contacts.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold">❤️ Medical Profile</h3>
          <p className="mt-3 text-gray-300">
            Stores important medical information securely.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;