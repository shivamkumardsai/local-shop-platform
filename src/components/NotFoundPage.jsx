import { Link } from "react-router-dom";

export default function NotFoundPage({ message = "Page not found" }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-50 px-6">
      <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-md">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-800">{message}</h1>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist or the shop slug is invalid.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
        >
          Go to Gupta Sweets
        </Link>
      </div>
    </div>
  );
}
