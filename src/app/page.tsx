"use client";

import Link from "next/link";
import { ArrowRight, Wallet, Search, Gift } from "lucide-react";
import { AirdropStats } from "@/components/AirdropStats";
import { AIRDROP_ADDRESS } from "@/lib/contracts";

const STEPS = [
  {
    icon: <Wallet size={24} />,
    title: "Connect",
    desc: "Connect your wallet using MetaMask, Coinbase Wallet, or WalletConnect.",
  },
  {
    icon: <Search size={24} />,
    title: "Check Eligibility",
    desc: "Your address is checked against a Merkle tree — a cryptographic allowlist stored on-chain.",
  },
  {
    icon: <Gift size={24} />,
    title: "Claim Tokens",
    desc: "If eligible, claim your SRBT tokens in one click. Gas fees are minimal on Sepolia testnet.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50
                        via-purple-50 to-pink-50 dark:from-gray-950
                        dark:via-purple-950/20 dark:to-gray-950 -z-10" />

        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="inline-block bg-blue-100 dark:bg-blue-900
                          text-blue-700 dark:text-blue-300 text-xs
                          font-semibold px-3 py-1 rounded-full mb-6">
            Deployed on Sepolia Testnet
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold
                        tracking-tight mb-4">
            Claim Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600
                            bg-clip-text text-transparent">
              {" "}SRBT Tokens
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl
                      mx-auto mb-8">
            A Merkle tree-based airdrop dApp built with Solidity, OpenZeppelin,
            Hardhat, and Next.js. Same pattern used by Uniswap, Optimism,
            and Arbitrum airdrops.
          </p>

          <Link
            href="/claim"
            className="inline-flex items-center gap-2 bg-blue-600
                       text-white px-8 py-3.5 rounded-xl font-semibold
                       text-lg hover:bg-blue-700 transition-colors
                       shadow-lg shadow-blue-600/25"
          >
            Check Eligibility
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-xl font-bold text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100
                              dark:bg-blue-900 flex items-center
                              justify-center mx-auto mb-3 text-blue-600">
                {step.icon}
              </div>
              <h3 className="font-semibold mb-1">
                {i + 1}. {step.title}
              </h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Stats ───────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-center mb-6">
          Live Stats
        </h2>
        <AirdropStats />
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t text-center py-8 text-xs text-gray-400">
        Built by{" "}
        <a href="https://github.com/saurabh0829"
          className="text-blue-500 hover:underline">Saurabh Sharma</a>
        {" · "}
        <a href="https://github.com/saurabh0829/merkle-airdrop-dapp"
          className="text-blue-500 hover:underline">View Source</a>
        {" · "}
        <a href={`https://sepolia.etherscan.io/address/${AIRDROP_ADDRESS}`}
          className="text-blue-500 hover:underline">Contract</a>
      </footer>
    </main>
  );
}