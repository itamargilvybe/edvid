"use client";

import React, { useEffect } from "react";
import UploadVideoModal from "../components/video/UploadVideoModal";
import VideoFeed from "../components/video/VideoFeed";
import { useAtom } from "jotai";
import { videosAtom, selectedVideoAtom } from "@/state/atoms";
import VideoPlayerModal from "../components/video/VideoPlayerModal";

export default function Home() {
  const [videos] = useAtom(videosAtom);
  const [selectedVideo, setSelectedVideo] = useAtom(selectedVideoAtom);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const found = videos.find((v) => v.id === hash);
        if (found) {
          setSelectedVideo(found);
        } else {
          setSelectedVideo(null);
        }
      } else {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    // On mount, check hash
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [videos, setSelectedVideo]);

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-10 md:py-24 relative px-2 sm:px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to EdVid
        </h1>
        <p className="text-base md:text-lg text-gray-700 max-w-2xl mb-8">
          A collaborative platform for sharing, discovering, and discussing
          educational videos. Upload your own, comment, and learn together!
        </p>
        <div className="mb-8">
          <UploadVideoModal />
        </div>
      </section>
      {/* Main Feed */}
      <main className="flex-1 px-2 sm:px-4 md:px-12">
        <VideoFeed />
      </main>
      {selectedVideo && (
        <VideoPlayerModal
          onClose={() => {
            window.location.hash = "";
          }}
        />
      )}
    </>
  );
}
