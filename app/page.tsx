import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">WordWorks API</h1>
      <span className="text-3xl">Check out the docs here:</span>
      <Link
        href="https://documenter.getpostman.com/view/36348829/2sA3kSoNjY"
        className="text-2xl underline"
      >
        https://documenter.getpostman.com/view/36348829/2sA3kSoNjY
      </Link>
    </main>
  );
}
