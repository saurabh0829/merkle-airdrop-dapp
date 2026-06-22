"use client";
import { useState, useMemo, useEffect } from "react";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAirdropRead } from "@/hooks/useAirdropRead";
import { useAirdropClaim } from "@/hooks/useAirdropClaim";
import {
    buildTree, getProof, isEligible,
    type AllowlistEntry
} from "@/lib/merkle";
import { TxStatus } from "./TxStatus";

interface Props {
    allowlist: AllowlistEntry[];
}

export function ClaimCard({ allowlist }: Props) {
    const { address, isConnected } = useAccount();
    const { hasClaimed, refetchClaimed } = useAirdropRead();
    const { claim, isWaitingForWallet, isConfirming, isSuccess, txHash, error } = useAirdropClaim();

    // Build tree once from allowlist (memoized)
    const tree = useMemo(() => buildTree(allowlist), [allowlist])

    // Check if connected wallet is in the allowlist
    const entry = address ? isEligible(allowlist, address) : undefined;

    const handleClaim = () => {
        if (!address || !entry) return;
        const proof = getProof(tree, address, entry.amount);
        claim(address, entry.amount, proof);
    };

    // Refetch after success so hasClaimed updates, but don't let it
    // hide TxStatus before the user sees the Etherscan link
    useEffect(() => {
        if (isSuccess) refetchClaimed();
    }, [isSuccess]);

    // STATE:1 Not Connected
    if (!isConnected) return (
        <div className="border-2 border-dashed rounded-2xl p-8 text-center">
            <p className="text-gray-500 mb-4">Connect your wallet to check Eligibility</p>
            <div className="flex justify-center">
                <ConnectButton />
            </div>
        </div>
    );

    // STATE:2 Already claimed (skip if isSuccess so TxStatus Etherscan link stays visible)
    if (hasClaimed && !isSuccess) return (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-green-800 font-semibold">You&apos;ve already claimed your SRBT tokens!</p>
        </div>
    )

    // State:3 Not eligible 
    if (!entry) return (
        <div className="bg-gray-50 border rounded-3xl px-8 text-center">
            <p className="text-gray-500">YOur address is not on the allowlist for this airdrop</p>
            <p className="text-xs font-mono text-gray-400 mt-2">{address}</p>
        </div>
    )

    // State 4 : Eligible - show claim button
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
            <p className="text-sm text-blue-600 mb-2">You&apos;re Eligible</p>
            <p className="text-3xl font-bold text-blue-900">
                {formatEther(entry.amount)} SRBT
            </p>
            <button
                onClick={handleClaim}
                disabled={isWaitingForWallet || isConfirming}
                className=" p-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isWaitingForWallet ? "Confirm in MetaMask..."
                    : isConfirming ? "Confirming on-chain..."
                        : "Claim your Tokens"
                }
            </button>
            <TxStatus
                isWaitingForWallet={isWaitingForWallet}
                isConfirming={isConfirming}
                isSuccess={isSuccess}
                error={error}
                txHash={txHash}
                successMessage="Tokens claimed! Check your wallet."
            />
        </div>
    )
}
