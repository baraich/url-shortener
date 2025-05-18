"use client";
import { trpc } from "@/lib/trpc";
import { useRef, useState } from "react";

export default function LandingPage() {
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string>();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateUrlMutation = trpc.createUrl.useMutation({
    onSuccess: ({ shortUrl }) => {
      setGeneratedUrl(shortUrl);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
      alert("Oops, something went wrong. Try again?");
    },
  });

  const generateUrl = async () => {
    if (!inputElementRef.current) {
      alert("Something’s off with the input field. Try refreshing!");
      return;
    }

    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    if (!urlPattern.test(inputElementRef.current.value)) {
      alert("That doesn’t look like a valid URL. Mind double-checking?");
      return;
    }

    setLoading(true);
    setCopied(false);
    generateUrlMutation.mutate({
      full_url: inputElementRef.current.value,
    });
  };

  const copyToClipboard = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-3">
            Snip Your Links!
          </h1>
          <p className="text-gray-300 text-lg">
            Turn those monster URLs into short, sweet links you can share
            anywhere.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              ref={inputElementRef}
              placeholder="Paste your long URL here..."
              className="w-full py-4 pl-12 pr-4 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
              onKeyUp={(e) => e.key === "Enter" && generateUrl()}
            />
          </div>

          <button
            onClick={generateUrl}
            disabled={loading}
            className="w-full py-4 px-6 bg-indigo-600 text-white rounded-lg font-semibold text-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                Shortening...
              </div>
            ) : (
              "Generate Shareable Link"
            )}
          </button>

          {generatedUrl && (
            <div className="mt-6 bg-gray-900 rounded-lg p-5 border border-gray-700">
              <p className="text-sm font-medium text-gray-300 mb-3">
                Here’s your shiny new link:
              </p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-800 rounded-l-lg py-4 px-4 border border-gray-600 h-12 flex items-center truncate">
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 font-medium hover:underline"
                  >
                    {generatedUrl}
                  </a>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-lg py-4 px-4 h-12 flex items-center transition-all"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-200 text-sm">
            Made with 💖 using <span className="underline">Next.js</span> and{" "}
            <span className="underline">TRPC</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
