// VideoPlayerModal: Modal for playing a selected video with controls and comments.
"use client";
import { useAtom } from "jotai";
import { selectedVideoAtom } from "@/state/atoms";
import CommentSection from "@/components/comments/CommentSection";
import { useEffect, useState } from "react";
import HybridVideoPlayer from "./HybridVideoPlayer";
import Spinner from "@/components/ui/Spinner";
import { X } from "lucide-react";

export default function VideoPlayerModal({
  onClose,
}: {
  onClose?: () => void;
}) {
  const [video, setSelectedVideo] = useAtom(selectedVideoAtom);

  const handleClose = () => {
    setSelectedVideo(null);
    window.location.hash = "";
    if (onClose) onClose();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!video) {
    return (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-4 relative animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50`}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-2 md:p-4 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Close Button */}
        <button
          className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-500 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleClose}
          aria-label="Close modal"
          type="button"
        >
          <X size={22} />
        </button>
        <div>
          <HybridVideoPlayer url={video.video_url} />
        </div>
        <div className="font-bold text-lg mb-1 mt-2 text-gray-900">
          {video.title}
        </div>
        <div className="text-gray-500 text-base mb-4 whitespace-pre-line">
          {video.description}
        </div>
        <CommentSection videoId={video.id} />
      </div>
    </div>
  );
}
