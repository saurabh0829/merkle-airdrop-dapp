"use client";
import dynamic from "next/dynamic";
import { parseEther } from "viem";

const ClaimCard = dynamic(
  () => import("@/components/ClaimCard").then((m) => m.ClaimCard),
  { ssr: false }
);

const AllowList = [
    { address: "0x2AA4553AaDC06Ec3144e23a3Ac99213d7dE63827", amount: parseEther("1000") },
    { address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", amount: parseEther("500") },
    { address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", amount: parseEther("250") },
]

export default function ClaimPage (){
    return (
        <main className="min-h-screen flex itmes-center justify-center p-8">
            <div className="max-w-md w-full space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">SRBT TOKEN Airdrop</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Connect your Wallet to check if you&apos;re eligible
                    </p>
                </div>
                <ClaimCard allowlist={AllowList}/>
            </div>
        </main>
    )
}