"use client";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AIRDROP_ABI, AIRDROP_ADDRESS } from "@/lib/contracts";

export function useAdminActions(){
    const {
        writeContract, 
        data : txHash,
        isPending,
        error: writeError,
        reset, //reset state for next action
    } = useWriteContract();

    const {isLoading:isConfirming, isSuccess} = useWaitForTransactionReceipt({hash:txHash});

    const updateRoot = (newRoot: `0x${string}`) => {
        writeContract({
            address: AIRDROP_ADDRESS,
            abi: AIRDROP_ABI,
            functionName:"updateMerkleRoot",
            args: [newRoot],
        });
    };

    // Withdraw unclaimed tokens back to owner
    const withdrawTokens = (amount:bigint)=>{
        writeContract({
            address: AIRDROP_ADDRESS,
            abi:AIRDROP_ABI,
            functionName:"withdrawTokens",
            args: [amount]
        })
    };

    return {
        updateRoot, withdrawTokens,
        isPending, isConfirming, isSuccess, txHash, error:writeError, reset,
    };
}