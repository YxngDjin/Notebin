"use client";

import CreateSnippetCard from "@/components/CreateSnippetCard";
import SnippetCard from "@/components/SnippetCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Snippet } from "../../../packages/types/index";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const fetchSnippets = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets`);
    setSnippets(response.data.data)
  }

  useEffect(() => {
    fetchSnippets()
  }, []);

  const onDelte = async (slug: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/snippets/${slug}`);

    if (response.status === 200) {
      setSnippets(snippets.filter(snippet => snippet.slug !== slug))
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-2xl mx-auto">
      <CreateSnippetCard onSuccess={fetchSnippets} />
      {/* CODESNIPPET LIST */}
      <div className="flex mt-4 flex-col gap-4">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet?.id} onDelete={() => onDelte(snippet?.slug)} title={snippet?.title} slug={snippet?.slug} language={snippet?.language} createdAt={snippet?.createdAt} expiresAt={snippet?.expiresAt as string} />
        ))}
      </div>

    </div>
  );
}
