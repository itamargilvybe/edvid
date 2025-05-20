// HybridVideoPlayer: Tries ReactPlayer first, falls back to Video.js if needed. Fullscreen supported for both.
"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import videojs from "video.js";
import screenfull from "screenfull";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function HybridVideoPlayer({ url }: { url: string }) {
  const [fallback, setFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const reactPlayerRef = useRef<any>(null);
  const videojsContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  // Fullscreen handler for both players
  const handleFullscreen = useCallback(() => {
    if (fallback) {
      if (screenfull && screenfull.isEnabled && videojsContainerRef.current) {
        screenfull.request(videojsContainerRef.current);
      }
    } else {
      if (
        screenfull &&
        screenfull.isEnabled &&
        reactPlayerRef.current &&
        reactPlayerRef.current.wrapper
      ) {
        screenfull.request(reactPlayerRef.current.wrapper);
      }
    }
  }, [fallback]);

  // Setup Video.js only if fallback is true
  useEffect(() => {
    if (fallback && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        preload: "auto",
        fluid: true,
        sources: [{ src: url }],
      });
      playerRef.current.on("loadeddata", () => setLoading(false));
      playerRef.current.on("error", () => {
        setLoading(false);
        setError(true);
      });
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [fallback, url]);

  // Reset state on url change
  useEffect(() => {
    setFallback(false);
    setLoading(true);
    setError(false);
  }, [url]);

  return (
    <div
      ref={fallback ? videojsContainerRef : undefined}
      className="relative bg-black"
    >
      {loading && !error && <Spinner />}
      {!fallback ? (
        <ReactPlayer
          ref={reactPlayerRef}
          url={url}
          width="100%"
          height="auto"
          controls
          onReady={() => setLoading(false)}
          onError={(e) => {
            setLoading(false);
            setError(true);
          }}
          className="w-full aspect-video"
        />
      ) : (
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-48 md:h-64"
        />
      )}
      {fallback && (
        <button
          onClick={handleFullscreen}
          className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded z-10"
          title="Fullscreen"
        >
          ⛶
        </button>
      )}
      {error && (
        <div className="text-red-600 text-center mt-2">
          Could not play this video. Try a different link.
          <br />
          <span className="text-xs">URL: {url}</span>
        </div>
      )}
    </div>
  );
}
