"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VideoDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [video, setVideo] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const suggestionsPerPage = 6;

  useEffect(() => {
    fetch("/videos.json")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        const selected = data.find((v: any) => v.id.toString() === id);
        setVideo(selected);
      });
  }, [id]);

  if (!video) return <div className="text-center mt-10">Loading...</div>;

  const suggestions = videos.filter((v) => v.id.toString() !== id);
  const totalPages = Math.ceil(suggestions.length / suggestionsPerPage);
  const indexOfLast = currentPage * suggestionsPerPage;
  const indexOfFirst = indexOfLast - suggestionsPerPage;
  const currentSuggestions = suggestions.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <video
          src={video.url}
          controls
          controlsList="nodownload"
          className="w-full rounded-xl shadow-lg mb-6"
        ></video>

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          {video.title}
        </h1>

        <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-300">
          Suggested Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentSuggestions.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/video/${item.id}`)}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden cursor-pointer shadow hover:scale-105 transition-transform duration-200"
            >
              <video
                src={item.url}
                className="w-full h-32 object-cover pointer-events-none"
                muted
              ></video>
              <div className="p-2 text-gray-700 dark:text-gray-200 truncate">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
