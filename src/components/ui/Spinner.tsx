// Spinner: Reusable loading spinner for async UI states.
"use client";
export default function Spinner({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
