function HowItWorks() {
  return (
    <section id="how" className="py-24 px-8 bg-black">
      <h2 className="text-4xl font-bold text-center mb-14">
        How <span className="text-blue-500">AlertX</span> Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-gray-900 p-8 rounded-2xl text-center">
          <div className="text-5xl mb-4">📱</div>
          <h3 className="text-2xl font-semibold mb-3">1. Detect</h3>
          <p className="text-gray-400">
            AlertX detects accidents using smart sensors and AI.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl text-center">
          <div className="text-5xl mb-4">📍</div>
          <h3 className="text-2xl font-semibold mb-3">2. Share</h3>
          <p className="text-gray-400">
            Your live location is instantly shared with emergency contacts.
          </p>
        </div>

        <div className="bg-gray-900 p-8 rounded-2xl text-center">
          <div className="text-5xl mb-4">🚑</div>
          <h3 className="text-2xl font-semibold mb-3">3. Rescue</h3>
          <p className="text-gray-400">
            Help reaches you faster with your medical profile and location.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;