function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        <h2 className="text-2xl font-bold">
          <span className="text-red-500">Alert</span>
          <span className="text-blue-500">X</span>
        </h2>

        <p className="mt-4 md:mt-0 text-sm">
          © 2026 AlertX. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;