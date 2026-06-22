"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { formatEther } from "viem";
import { Upload, CheckCircle, Loader2 }
    from "lucide-react";
import { parseAllowlistCSV } from "../lib/allowList";
import { buildTree, getRoot, type AllowlistEntry }
    from "@/lib/merkle";
import { useAdminActions } from "@/hooks/useAdminActions";
import { useAirdropRead } from "@/hooks/useAirdropRead";
import { TxStatus } from "./TxStatus";

export const AdminPanel = () => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [entries, setEntries] = useState<AllowlistEntry[]>([]);
    const [fileName, setFileName] = useState<string>("")
    const [isMounted, setIsMounted] = useState(false);
    const { merkleRoot: onChainRoot } = useAirdropRead();
    const {
        updateRoot, isPending, isConfirming, isSuccess, txHash, error
    } = useAdminActions();

    // Prevent hydration mismatch by only rendering blockchain data after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // compute tree + root whenever entries change
    const tree = useMemo(() =>
        entries.length > 0 ? buildTree(entries) : null,
        [entries]);
    const newRoot = tree ? getRoot(tree) : null;

    // Total tokens to distribute
    const totalTokens = entries.reduce(
        (sum, e) => sum + e.amount, 0n
    );

    // Handle CSV file upload
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (ev) => {
            const csv = ev.target?.result as string;
            const parsed = parseAllowlistCSV(csv);
            setEntries(parsed);
        };
        reader.readAsText(file);
    }

    // Determine button status Text
    const btnText = isPending ? "Confirm in MetaMask..."
        : isConfirming ? "Confirming on-chain..."
            : isSuccess ? "Root updated!"
                : "Updated Root On-Chain"

    return (
        <div className="space-y-6">

            {/* Step1 : Upload CSV */}
            <div
                className="border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileRef.current?.click()}
            >
                <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm text-gray-400">
                    {fileName ?
                        <span className="text-green-600 font-medium">
                            ✅ {fileName}-{entries.length} address loaded
                        </span>
                        : "Click to upload CSV (address, amount)"
                    }
                </p>
                <input
                    ref={fileRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFile}
                    className="hidden"
                />
            </div>

            {/* Step 2: Allowlist table */}
            {entries.length > 0 && (
                <div className="border rounded-xl overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase">Allowlist ({entries.length} addresses)</span>
                        <span className="text-xs text-gray-400">Total: {formatEther(totalTokens)} SRBT</span>
                    </div>

                    <table className="w-full text-sm">
                        <thead >
                            <tr className="text-left text-xs text-gray-500 border-b">
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2 text-right">Amount (SRBT)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {entries.map((e, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <td className="px-4 py-2 text-gray-400 text-xs">{i + 1}</td>
                                    <td className="px-4 py-2 font-mono text-xs">{e.address.slice(0, 8)}...{e.address.slice(-6)}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{formatEther(e.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Step3: Merkle root + submit */}
            {newRoot && isMounted && (
                <div className="border rounded-xl p-5 space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">New root</span>
                            <span className="font-mono text-xs text-blue-600">{newRoot.slice(0, 10)}...{newRoot.slice(-8)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">On-Chain Root</span>
                            <span>
                                {onChainRoot
                                    ? `${onChainRoot.slice(0, 10)}...${onChainRoot.slice(-8)}` : "Loading..."
                                }
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => updateRoot(newRoot as `0x${string}`)}
                        disabled={isPending || isConfirming}
                        className="w-full bg-purple-600 text-white py-2.5 rounded-xl
                       font-semibold text-sm hover:bg-purple-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2
                       transition-colors"
                    >
                        {(isPending || isConfirming) &&
                            <Loader2 size={16} className="animate-spin" />}
                        {isSuccess && <CheckCircle size={16} />}
                        {btnText}
                    </button>

                    {/* {txHash && (
                        <a 
                            href={`https://sepolia.etherscan.io/tx/${txHash}`}
                            target="_blank"
                            className="block text-center text-xs text-blue-500"
                        >
                            View transaction on Etherscan ↗
                        </a>
                    )}

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 text-xs">
                            <AlertCircle size={14}/>
                            {error.message.slice(0,100)}
                        </div>
                    )} */}
                    <TxStatus
                        isWaitingForWallet={isPending}
                        isConfirming={isConfirming}
                        isSuccess={isSuccess}
                        error={error}
                        txHash={txHash}
                        successMessage="Merkle root updated on-chain!"
                    />

                </div>
            )}
        </div>
    )
}