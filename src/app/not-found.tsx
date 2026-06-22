import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-4xl font-extrabold mb-2">404</h1>
        <p className="text-gray-500 mb-6">Page not found.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Go home
        </Link>
      </div>
    </main>
  );
}
