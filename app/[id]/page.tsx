"use client";
import { trpc } from "@/lib/trpc";
import Link from "next/link";
import { useEffect } from "react";
import { use } from "react";

interface RedirectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RedirectPage({ params }: RedirectPageProps) {
  const { id } = use(params); // Unwrap the params Promise using React.use()

  // Perform the URL lookup using tRPC on the client
  const { data, isLoading, error } = trpc.urlLookup.useQuery({ id });

  // Redirect if the lookup was successful and a full_url exists
  useEffect(() => {
    if (data?.status && data?.full_url) {
      window.location.href = data.full_url;
    }
  }, [data]);

  // Show loading state while fetching
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-gray-300 text-lg mt-4">Redirecting you...</p>
        </div>
      </div>
    );
  }

  // Fallback UI if the URL is not found or lookup fails
  if (error || !data?.status || !data?.full_url) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Oops, Link Not Found!
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            The short link{" "}
            <span className="text-indigo-400 font-medium">{id}</span> doesn’t
            seem to exist. It might have expired or been mistyped.
          </p>
          <Link
            href="/"
            className="inline-block py-4 px-6 bg-indigo-600 text-white rounded-lg font-semibold text-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Create a New Short Link
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
