"use client";

import Link from "next/link";

type Props = {
  title: string;
  message?: string;
};

export default function DataError({ title, message }: Props) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold mb-4">
        {title}
      </h1>

      <p className="text-lg text-gray-600 mb-4 max-w-md">
        {message || "This may be a temporary backend issue."}
      </p>

      <p className="text-sm text-gray-500 mb-8">
        Please try again in a few minutes.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => location.reload()}
          className="px-6 py-3 border border-black uppercase tracking-wide text-sm hover:bg-black hover:text-white transition"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="px-6 py-3 bg-black text-white uppercase tracking-wide text-sm hover:opacity-80 transition"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}