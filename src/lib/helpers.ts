import { fetchVideosByUser } from "./api";

export async function allVideos(user_id: string) {
  const videos1 = await fetchVideosByUser(user_id);
  const videos2 = await fetchVideosByUser("john_doe");
  const all = [...videos1, ...videos2];
  const unique = Array.from(new Map(all.map((v) => [v.id, v])).values());
  return unique.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
