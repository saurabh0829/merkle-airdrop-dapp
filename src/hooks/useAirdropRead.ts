"use client";

import { useReadContract, useAccount } from "wagmi";
import { AIRDROP_ADDRESS, AIRDROP_ABI, TOKEN_ABI, TOKEN_ADDRESS } from "../lib/contracts";

export function useAirdropRead(){
    const {address} = useAccount();

    const {data:hasClaimed, refetch: refetchClaimed} = useReadContract({
        address:AIRDROP_ADDRESS, abi:AIRDROP_ABI,
        functionName:"hasClaimed", args:address ? [address] : undefined, 
        query: {enabled: !!address},
    });

    // Remaining tokens in the airdrop contract
    const {data:remainingTokens} = useReadContract({
        address:AIRDROP_ADDRESS, abi:AIRDROP_ABI,
        functionName : "getContractTokenBalance",
    });

    // Merkle root currently stored onchain
    const {
        data:merkleRoot,
        isLoading: isMerkleRootLoading,
        isError: isMerkleRootError,
    } = useReadContract({
        address:AIRDROP_ADDRESS, abi:AIRDROP_ABI,
        functionName:"merkelRoot"
    })

    // Connected Wallet' SRBT token balance
    const {data:tokenBalance} = useReadContract({
        address: TOKEN_ADDRESS, abi:TOKEN_ABI,
        functionName: "balanceOf", args: address ? [address] : undefined,
        query:{enabled: !!address}
    })

    return {
        hasClaimed: hasClaimed as boolean | undefined,
        remainingTokens : remainingTokens as bigint | undefined,
        merkleRoot: merkleRoot as `0x${string}` | undefined,
        isMerkleRootLoading,
        isMerkleRootError,
        tokenBalance: tokenBalance as bigint | undefined,
        refetchClaimed,
    };
}