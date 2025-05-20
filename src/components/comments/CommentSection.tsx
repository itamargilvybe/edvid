// CommentSection: Displays and posts comments for a given video, with clear loading, error, and empty states.
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { fetchComments, postComment } from "@/lib/api";
import { userAtom } from "@/state/atoms";
import { useState } from "react";
import { useToast } from "@/components/ui/Toast";
import type { Comment, CreateCommentPayload } from "@/types";
import Spinner from "@/components/ui/Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function CommentSection({ videoId }: { videoId: string }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [user, setUser] = useAtom(userAtom);
  const [text, setText] = useState("");

  // Fetch comments
  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Comment[]>({
    queryKey: ["comments", videoId],
    queryFn: () => fetchComments(videoId),
    refetchInterval: 5000,
  });

  // Post comment mutation
  const mutation = useMutation({
    mutationFn: (payload: CreateCommentPayload) => postComment(payload),
    onSuccess: () => {
      setText("");
      toast("Comment posted!", "success");
      queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
    },
    onError: (err: Error) => {
      toast(err.message || "Failed to post comment", "error");
    },
  });

  // Handle comment form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    mutation.mutate({ video_id: videoId, content: text, user_id: user });
  };

  // UI: Loading state
  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="font-semibold mb-2">Comments</div>
        <div className="flex items-center gap-2">
          <Spinner size={20} /> Loading comments...
        </div>
      </div>
    );
  }

  // UI: Error state
  if (isError) {
    return (
      <div className="mt-4">
        <div className="font-semibold mb-2">Comments</div>
        <div className="text-red-600 flex flex-col gap-2">
          <span>Error loading comments.</span>
          <button
            className="bg-red-600 text-white px-2 py-1 rounded"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // UI: Main
  return (
    <div className="mt-4">
      <div className="font-semibold mb-2 text-xl text-gray-800">Comments</div>
      <div className="relative bg-white rounded-xl shadow border border-gray-200 max-h-96 flex flex-col overflow-hidden">
        {/* Comments Feed */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {comments.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="flex items-start gap-3 bg-white/80 hover:bg-gray-50 transition rounded-lg p-3 border border-gray-100 shadow-sm"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow">
                  {c.user_id?.[0]?.toUpperCase() || "?"}
                </div>
                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-gray-800 truncate max-w-[120px]">
                      {c.user_id}
                    </span>
                    <span className="text-xs text-gray-400">
                      · {dayjs(c.created_at).fromNow()}
                    </span>
                  </div>
                  <div className="text-gray-700 text-base break-words whitespace-pre-line">
                    {c.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Comment Input (sticky at bottom) */}
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex flex-col sm:flex-row gap-1 md:gap-2 items-start px-2 sm:px-4 py-2 sm:py-3 z-10"
          style={{ boxShadow: "0 -2px 8px 0 rgba(31,38,135,0.04)" }}
        >
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 text-base min-h-[44px]"
            placeholder="Your name"
            value={user || ""}
            onChange={(e) => setUser(e.target.value)}
            required
            maxLength={20}
          />
          <textarea
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 text-base min-h-[44px] resize-none"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            maxLength={300}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center min-w-[90px] min-h-[44px] justify-center shadow-md disabled:opacity-60"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner size={16} /> : null}
            {mutation.isPending ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
