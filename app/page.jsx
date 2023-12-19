import Link from 'next/link';
export default function Home() {
  return (
    <>
      <div className="bg-purple-200 h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-indigo-700 mb-6">Quizzer</h1>
          <p className="text-gray-600 mb-8">
            Welcome to the ultimate quiz experience!
          </p>
          <Link href="/game">
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-md mr-4 hover:bg-indigo-400 focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out">
            Play Now
          </button>
          </Link>
          <a
            href="https://github.com/bogdantomic1"
            className="text-indigo-500 hover:underline focus:outline-none focus:ring focus:border-indigo-300 transition duration-300 ease-in-out"
          >
            Contact Me on GitHub
          </a>
        </div>
      </div>
    </>
  );
}
