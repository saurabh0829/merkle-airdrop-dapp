"use client";
import dynamic from "next/dynamic";

const AdminPanel = dynamic(
  () => import("@/components/AdminPanel").then((m) => m.AdminPanel),
  { ssr: false }
);

export default function AdminPage(){
    return(
        <main className="max-w-2xl mx-auto p-6 space-y-6">
            <div className="">
                <h1 className="text-2xl font-bold text-gray-900">Airdrop Admin</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Upload an allowlist CSV to generate and publish a new Merkle Root.
                </p>
            </div>
            <AdminPanel/>
        </main>
    )
}