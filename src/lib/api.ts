// api.ts: Centralized API functions for videos and comments.
// All backend communication is handled here for maintainability.

import axios from "axios";
import type {
  Video,
  Comment,
  CreateVideoPayload,
  CreateCommentPayload,
} from "@/types";

const API_BASE = process.env.API_BASE;

export async function fetchVideos() {
  // todo new backend endpoint that fetches all videos relevant to a user, not just by the user
}

export async function fetchVideosByUser(user_id: string): Promise<Video[]> {
  const res = await axios.get(`${API_BASE}/videos?user_id=${user_id}`);
  return res.data.videos;
}

export async function fetchVideo(video_id: string): Promise<Video> {
  const res = await axios.get(`${API_BASE}/videos/single?video_id=${video_id}`);
  return res.data.video;
}

export async function uploadVideo(data: CreateVideoPayload): Promise<Video> {
  const sanitizedPayload = {
    ...data,
    user_id: data.user_id.replace(/\s+/g, "_"),
  };
  const res = await axios.post(`${API_BASE}/videos`, sanitizedPayload);
  return res.data;
}

export async function fetchComments(videoId: string): Promise<Comment[]> {
  const res = await axios.get(
    `${API_BASE}/videos/comments?video_id=${videoId}`
  );
  return res.data.comments;
}

export async function postComment(
  data: CreateCommentPayload
): Promise<Comment> {
  // Replace spaces in user_id with underscores
  const sanitizedPayload = {
    ...data,
    user_id: data.user_id.replace(/\s+/g, "_"),
  };
  const res = await axios.post(
    `${API_BASE}/videos/comments?video_id=${data.video_id}`,
    sanitizedPayload
  );
  return res.data;
}
