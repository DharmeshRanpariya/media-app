"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [videos, setVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;
  const router = useRouter();

  useEffect(() => {
    fetch("/videos.json")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch((err) => console.error("Error loading videos:", err));
  }, []);

  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLast = currentPage * videosPerPage;
  const indexOfFirst = indexOfLast - videosPerPage;
  const currentVideos = videos.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Video Gallery
      </h1>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => router.push(`/video/${video.id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
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
  );
}

function VideoCard({ video, onClick }: { video: any; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, 150);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden cursor-pointer 
                 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={video.url}
        muted
        playsInline
        preload="metadata"
        className="w-full h-48 object-cover transition-all duration-300 group-hover:brightness-110"
      ></video>

      {/* Title */}
      <div className="p-4 text-gray-800 dark:text-gray-200">
        <h3 className="font-semibold truncate">{video.title}</h3>
      </div>
    </div>
  );
}
