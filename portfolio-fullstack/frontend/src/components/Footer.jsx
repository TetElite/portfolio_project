function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        &copy; {year} My Portfolio. Built with React &amp; Node.js.
      </div>
    </footer>
  );
}

export default Footer;
