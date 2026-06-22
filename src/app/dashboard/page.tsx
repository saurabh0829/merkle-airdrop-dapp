"use client";
import dynamic from "next/dynamic";

const AirdropStats = dynamic(
  () => import("@/components/AirdropStats").then((m) => m.AirdropStats),
  { ssr: false }
);

export default function DashboardPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Airdrop Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Live stats from the SRBT airdrop contract on Sepolia.
        </p>
      </div>
      <AirdropStats />
    </main>
  );
}