// src/app/actions/uploadVideo.ts
"use server";

import { revalidatePath } from "next/cache";
import { uploadVideo } from "@/lib/api"; // <-- your API function

export async function uploadVideoAction(
  prevState: { message: string; ok: boolean },
  formData: FormData
) {
  const user = formData.get("user") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("video_url") as string;

  // Build your payload as expected by uploadVideo
  const payload = {
    user_id: user,
    title,
    video_url: videoUrl,
    description,
  };

  try {
    const newVideo = await uploadVideo(payload);
    revalidatePath("/");
    return {
      message: "Video uploaded successfully!",
      ok: true,
      video: newVideo,
    };
  } catch (e: any) {
    return { message: e?.message || "Upload failed", ok: false };
  }
}
