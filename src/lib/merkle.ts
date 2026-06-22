import {MerkleTree} from "merkletreejs"
import keccak256 from "keccak256";
import {encodeAbiParameters, keccak256 as viemKeccak, getAddress} from 'viem'

export interface AllowlistEntry {
    address : string;
    amount: bigint;
}

// Leaf Hash 
export function buildLeaf(address:string, amount:bigint): Buffer {
    // Double hash to match the OpenZeppeline' std
    try {
        const validatedAddress = getAddress(address);
        const inner = viemKeccak(
            encodeAbiParameters(
                [{ type: "address" }, { type: "uint256" }],
                [validatedAddress, amount]
            )
        );
        return keccak256(inner);
    } catch (error) {
        console.error(`Invalid address in buildLeaf: "${address}"`, error);
        throw error;
    }
}

// Build the entire Merkle tree from an allowlist
export function buildTree(entires: AllowlistEntry[]):MerkleTree {
    const leaves = entires.map((e)=>buildLeaf(e.address, e.amount));
    return new MerkleTree(leaves, keccak256, {sortPairs:true})
}

// Root as  hex string(storing onchain)
export function getRoot(tree:MerkleTree):string {
    return tree.getHexRoot() as `0x${string}`;
}

// Proof for specific address + amount
export function getProof(
    tree: MerkleTree,
    address: string,
    amount:bigint,
) : `0x${string}`[] {
    const leaf = buildLeaf(address, amount);
    return tree.getHexProof(leaf) as `0x${string}`[];
}

// Address check in the tree
export function isEligible(
    entires: AllowlistEntry[],
    address: string
): AllowlistEntry | undefined {
    return entires.find((e)=>
        e.address.toLowerCase() === address.toLowerCase()
    );
}