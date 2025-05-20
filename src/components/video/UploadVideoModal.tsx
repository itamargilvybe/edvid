"use client";
import { useAtom, useSetAtom } from "jotai";
import { useRef, useEffect, useActionState } from "react";
import { modalAtom, userAtom, videosAtom } from "@/state/atoms";
import { useFormStatus } from "react-dom";
import { uploadVideoAction } from "@/actions/uploadVideo";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center min-w-[100px] shadow-md disabled:opacity-60"
      disabled={pending}
    >
      {pending ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
          Uploading...
        </>
      ) : (
        "Upload"
      )}
    </button>
  );
}

export default function UploadVideoModal() {
  const [modal, setModal] = useAtom(modalAtom);
  const [user, setUser] = useAtom(userAtom);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const setVideos = useSetAtom(videosAtom);

  const [formState, formAction] = useActionState(uploadVideoAction, {
    message: "",
    ok: false,
  });

  useEffect(() => {
    if (modal === "upload" && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [modal]);

  // Optionally close modal on success
  useEffect(() => {
    if (formState.ok) {
      setModal("none");
    }
  }, [formState.ok, setModal]);

  useEffect(() => {
    if (formState.ok && formState.video) {
      setVideos((prev) => [...prev, formState.video]);
    }
  }, [formState, setVideos]);

  const handleOpen = () => setModal("upload");
  const handleClose = () => setModal("none");

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleOpen}
      >
        Upload Video
      </button>
      {modal === "upload" && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-2 md:p-6 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={handleClose}
              aria-label="Close modal"
            >
              &times;
            </button>
            <form
              action={formAction}
              className="flex flex-col gap-4"
              autoComplete="off"
            >
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  ref={nameInputRef}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 text-base"
                  placeholder="Your name"
                  name="user"
                  defaultValue={user || ""}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Title
                </label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 text-base"
                  placeholder="Video title"
                  name="title"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Video URL
                </label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 text-base"
                  placeholder="Video URL (e.g. https://...)"
                  name="video_url"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 text-base min-h-[60px] resize-none"
                  placeholder="Description"
                  name="description"
                  required
                />
              </div>
              <SubmitButton />
              {formState.message && (
                <div
                  className={`mt-2 text-sm ${
                    formState.ok ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formState.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
