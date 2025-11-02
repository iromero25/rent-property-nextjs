import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-amber-600 text-2xl">Welcome</h1>
      <Link href="/properties">Go to properties</Link>
    </div>
  );
}
