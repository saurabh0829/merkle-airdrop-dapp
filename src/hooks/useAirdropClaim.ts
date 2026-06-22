"use client";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AIRDROP_ABI, AIRDROP_ADDRESS } from "@/lib/contracts";

export function useAirdropClaim(){
    const {
        writeContract,
        data: txHash,
        isPending:isWaitingForWallet,
        error : writeError,
    } = useWriteContract();

    const {
        isPending: isConfirming,
        isSuccess,
    } = useWaitForTransactionReceipt({ hash: txHash });

    const claim = (
        claimant: `0x${string}`,
        amount: bigint,
        proof: `0x${string}`[]
    ) =>{
        writeContract({
            address: AIRDROP_ADDRESS,
            abi: AIRDROP_ABI,
            functionName: "claim",
            args: [claimant, amount, proof]
        });
    };

    return {
        claim, 
        isWaitingForWallet,
        isConfirming,
        isSuccess,
        txHash,
        error: writeError,
    }
}