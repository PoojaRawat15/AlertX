function About() {
  return (
    <section id="about" className="py-24 px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-5xl font-bold mb-8">
          About <span className="text-red-500">AlertX</span>
        </h2>

        <p className="text-gray-300 text-lg leading-8">
          AlertX is a smart emergency response platform built to help people
          during critical situations. It detects accidents, securely stores
          medical information, shares live location with emergency contacts,
          and helps emergency services respond faster when every second matters.
        </p>

      </div>
    </section>
  );
}

export default About;