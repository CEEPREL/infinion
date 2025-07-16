import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center animate-fade-in px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-md mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/user"
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound404;
