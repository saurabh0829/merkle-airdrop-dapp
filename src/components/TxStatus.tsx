"use client";

import { Loader2, CheckCircle2, XCircle, ExternalLink }
  from "lucide-react";

interface TxStatusProps {
  isWaitingForWallet: boolean;
  isConfirming:       boolean;
  isSuccess:          boolean;
  error?:             Error | null;
  txHash?:            string;
  successMessage?:    string;  // custom success text
}

export function TxStatus({
  isWaitingForWallet, isConfirming,
  isSuccess, error, txHash,
  successMessage = "Transaction confirmed!"
}: TxStatusProps) {

  // Nothing to show if idle
  if (!isWaitingForWallet && !isConfirming && !isSuccess && !error)
    return null;

  return (
    <div className="mt-4 space-y-2">

      {/* Waiting for MetaMask */}
      {isWaitingForWallet && (
        <div className="flex items-center gap-2 text-sm text-yellow-700
                          bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-300
                          px-4 py-2.5 rounded-lg border border-yellow-200
                          dark:border-yellow-800">
          <Loader2 size={15} className="animate-spin flex-shrink-0" />
          <span>Waiting for MetaMask confirmation…</span>
        </div>
      )}

      {/* On-chain confirming */}
      {isConfirming && (
        <div className="flex items-center gap-2 text-sm text-blue-700
                          bg-blue-50 dark:bg-blue-950 dark:text-blue-300
                          px-4 py-2.5 rounded-lg border border-blue-200
                          dark:border-blue-800">
          <Loader2 size={15} className="animate-spin flex-shrink-0" />
          <span>Transaction submitted — waiting for on-chain confirmation…</span>
        </div>
      )}

      {/* Success */}
      {isSuccess && (
        <div className="text-sm bg-green-50 dark:bg-green-950 text-green-700
                          dark:text-green-300 px-4 py-2.5 rounded-lg
                          border border-green-200 dark:border-green-800
                          space-y-1">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
          {txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs hover:underline
                          text-green-600 dark:text-green-400 w-fit"
            >
              <ExternalLink size={11} />
              {txHash.slice(0,10)}…{txHash.slice(-8)} — View on Etherscan
            </a>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-red-700
                          bg-red-50 dark:bg-red-950 dark:text-red-300
                          px-4 py-2.5 rounded-lg border border-red-200
                          dark:border-red-800">
          <XCircle size={15} className="flex-shrink-0 mt-0.5" />
          <span>
            {/* Trim long MetaMask error messages */}
            {error.message.length > 120
              ? error.message.slice(0, 120) + "…"
              : error.message}
          </span>
        </div>
      )}
    </div>
  );
}