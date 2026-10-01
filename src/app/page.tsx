export const metadata = {
  title: "focus — study with me",
  description: "A cozy focus & study space with lo-fi music, ambient sounds, and animated landscapes.",
};

export default function Home() {
  return (
    <iframe
      src="/focus.html"
      title="Focus — study with me"
      className="fixed inset-0 h-full w-full border-0"
      allow="autoplay; fullscreen; encrypted-media"
      allowFullScreen
    />
  );
}
