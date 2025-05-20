// Centralized types for videos, comments, and app state

export type Video = {
  id: string;
  created_at: string;
  video_url: string;
  user_id: string;
  description: string;
  title: string;
  num_comments: number;
};

export type Comment = {
  id: string;
  created_at: string;
  content: string;
  user_id: string;
  video_id: string;
};

export type CreateVideoPayload = {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
};

export type CreateCommentPayload = {
  video_id: string;
  content: string;
  user_id: string;
};

export type ModalType = "none" | "player" | "upload";
