export default function Footer({
  onNav,
}: {
  onNav: (section: string) => void;
}) {
  return (
    <footer className="mt-12 py-6 bg-white/80 backdrop-blur-md text-center text-gray-500 text-sm border-t border-gray-200">
      <div>
        EdVid &copy; {new Date().getFullYear()} &mdash; Built for collaborative
        learning.{" "}
        <button
          onClick={() => onNav("about")}
          className="text-blue-600 hover:underline ml-2"
        >
          About
        </button>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        <button onClick={() => onNav("privacy")} className="hover:underline">
          Privacy
        </button>
        <button onClick={() => onNav("terms")} className="hover:underline">
          Terms
        </button>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
