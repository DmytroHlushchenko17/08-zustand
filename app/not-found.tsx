import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not-found",
  description: "Not-found",
  openGraph: {
    title: "Not-found",
    description: "Not-found",
    url: "https://notehub.com/notes",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
