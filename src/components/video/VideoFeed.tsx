// VideoFeed: Displays a grid of video cards and handles loading/error/empty states.
"use client";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/Spinner";
import type { Video } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import { selectedVideoAtom, userAtom, videosAtom } from "@/state/atoms";
import { useEffect } from "react";
import { allVideos } from "@/lib/helpers";

export default function VideoFeed() {
  const [user_id] = useAtom(userAtom);
  const {
    data: videos,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["videos", user_id],
    queryFn: () => allVideos(user_id || "john_doe"),
    enabled: !!user_id,
    refetchInterval: 5000,
  });

  const setSelectedVideo = useSetAtom(selectedVideoAtom);
  const setVideos = useSetAtom(videosAtom);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    window.location.hash = video.id;
  };

  useEffect(() => {
    if (videos) setVideos(videos);
  }, [videos, setVideos]);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex flex-col items-center gap-2 text-red-600">
        <div>Error loading videos.</div>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  if (!videos || videos.length === 0)
    return (
      <div className="text-gray-500 text-center mt-8">
        No videos yet. Be the first to upload!
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {videos.map((video: Video) => {
        return (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-lg p-0 cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border border-gray-100 group overflow-hidden flex flex-col"
            onClick={() => handleVideoClick(video)}
          >
            {/* Thumbnail area */}
            <div className="bg-gray-200 h-40 flex items-center justify-center relative">
              {/* Replace with actual thumbnail if available */}
              <span className="text-5xl text-gray-400">🎬</span>
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full opacity-80 group-hover:opacity-100 transition">
                {video.num_comments} comments
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between p-4">
              <div>
                <div className="font-semibold text-lg text-gray-900 truncate text-center mb-1">
                  {video.title}
                </div>
                <div className="text-xs text-gray-500 text-center mb-2">
                  By {video.user_id}
                </div>
                <div className="text-sm text-gray-700 text-center mb-2 line-clamp-2">
                  {video.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
