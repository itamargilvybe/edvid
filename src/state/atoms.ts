// atoms.ts: Jotai atoms for global state management (user, modal, selected video)
import { atom } from "jotai";
import type { Video, ModalType } from "@/types";

export const userAtom = atom<string | null>("john_doe");
export const modalAtom = atom<ModalType>("none");
export const selectedVideoAtom = atom<Video | null>(null);
export const videosAtom = atom<Video[]>([]);
