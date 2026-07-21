import { Link } from "react-router-dom";
function Hero() {
  return (
    
    <section id="home" className="flex flex-col items-center justify-center text-center px-6 pt-28 mt-24 pb-24 bg-black">
      <h1 className="text-6xl font-extrabold leading-tight">
        Every Second
        <br />
        <span className="text-red-500">Can Save a Life</span>
      </h1>

      <p className="text-gray-300 text-xl mt-8 max-w-3xl">
        AlertX is an intelligent emergency response system designed to detect
        accidents, store medical information and instantly notify emergency
        contacts with your live location.
      </p>

      <div className="mt-10 flex gap-5">
        <Link
  to="/signup"
  className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold inline-block"
>
  Get Started
</Link>
<a
  href="#features"
  className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold inline-block"
>
  Learn More
</a>
        
      </div>

    </section>
  );
}

export default Hero;