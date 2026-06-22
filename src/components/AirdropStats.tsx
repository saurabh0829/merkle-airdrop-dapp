"use client";
import { formatEther } from "viem"
import { Coins, Hash, Wallet, ExternalLink } from "lucide-react";
import { useAirdropRead } from "@/hooks/useAirdropRead";
import { AIRDROP_ADDRESS, TOKEN_ADDRESS } from "@/lib/contracts";

const EXPLORER = "https://sepolia.etherscan.io/address";

export function AirdropStats() {
    const {
        remainingTokens, merkleRoot, isMerkleRootError,
        tokenBalance, hasClaimed
    } = useAirdropRead();
    const stats = [
        {
            icon: <Coins size={20} className="text-blue-500" />,
            label: "Remaining in Airdrop",
            value: remainingTokens !== undefined
                ? `${parseFloat(formatEther(remainingTokens)).toLocaleString()} SRBT`
                : "Loading...",
        },
        {
            icon: <Wallet size={20} className="text-green-500" />,
            label: "Your SRBT Balance",
            value: tokenBalance !== undefined
                ? `${formatEther(tokenBalance)} SRBT`
                : "Connect wallet",
        },
        {
            icon: <Hash size={20} className="text-purple-500" />,
            label: "Current Merkle Root",
            value: isMerkleRootError
                ? "Failed to load"
                : merkleRoot !== undefined
                    ? `${merkleRoot.slice(0, 10)}…${merkleRoot.slice(-8)}`
                    : "Loading...",
            mono: true,
        },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.map((s) => (
                    <div key={s.label}
                        className="border  rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            {s.icon}
                            <span className="text-xs text-gray-700">{s.label}</span>
                        </div>
                        <p className={`text-lg font-bold ${s.mono ? "font-mono text-sm":""}`}>
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Claim status */}
            {hasClaimed !== undefined && (
                <div className={`text-sm text-center py-2 px-4 rounded-lg ${hasClaimed
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"}`}
                >
                    {hasClaimed
                        ? "✅ You have claimed your tokens"
                        : "⏳ You have not claimed yet"
                    }
                </div>
            )}

            {/* Contracts Links */}
            <div className="flex flex-col sm:flex-row gap-2 text-xs">
                <a 
                    href={`${EXPLORER}/${TOKEN_ADDRESS}`} target="_blank"
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                    >
                    <ExternalLink size={12}/>SRBT Token Contract
                </a>
                <a 
                    href={`${EXPLORER}/${AIRDROP_ADDRESS}`} target="_blank"
                    className="flex items-center gap-1 text-blue-500 hover:underline"
                >
                    <ExternalLink size={12} /> Airdrop Contract
                </a>
            </div>
        </div>
    )
}