function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Hi, I&apos;m a Full Stack Developer
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        I build modern web applications with React, Node.js, and MongoDB.
      </p>
      <a
        href="/projects"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        View My Projects
      </a>
    </main>
  );
}

export default Home;
