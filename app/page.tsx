"use client";

import { trpc } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

export default function LandingPage() {
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string>();

  const generateUrlMutation = trpc.createUrl.useMutation({
    onSuccess: function ({ shortUrl }) {
      setGeneratedUrl(shortUrl);
    },
  });

  const generateUrl = async function () {
    if (!inputElementRef.current)
      return alert("Error: Element Reference not set!");

    generateUrlMutation.mutate({
      full_url: inputElementRef.current.value,
    });
    inputElementRef.current.value = "";
  };

  return (
    <main>
      <input type="text" ref={inputElementRef} placeholder="URL" />
      <button onClick={generateUrl}>Generate</button>
      {generatedUrl}
    </main>
  );
}
