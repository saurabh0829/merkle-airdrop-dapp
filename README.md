# 🪙 SRBT Merkle Airdrop dApp

> Full-stack Web3 airdrop platform using Merkle proofs for gas-efficient
> token distribution. Same pattern used by Uniswap, Optimism, and Arbitrum.
> Built with Solidity, OpenZeppelin, Hardhat, Next.js, wagmi, and viem.

## 🌐 Live Demo
[merkle-airdrop-dapp.vercel.app](https://merkle-airdrop-dapp.vercel.app)



## 📸 Screenshots
<img width="1469" height="807" alt="Screenshot 2026-06-22 at 11 54 06" src="https://github.com/user-attachments/assets/d4f5f72c-ca6b-406d-a875-52c77929e2b6" />


<img width="1469" height="806" alt="Screenshot 2026-06-22 at 11 56 27" src="https://github.com/user-attachments/assets/dd907779-5a7f-41a2-9708-2ae3a74df32e" />




## ✨ Features
- **Merkle tree airdrop** — gas-efficient allowlist verification
- **Claim page** — wallet-aware, 4-state UX (not connected / not eligible / eligible / claimed)
- **Admin panel** — upload CSV → auto-generate Merkle root → update on-chain
- **Live stats dashboard** — remaining tokens, Merkle root, wallet balance
- **OpenZeppelin contracts** — ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard
- **8 Hardhat tests** — including attack scenarios (double-claim, fake proof, front-running)
- **Responsive UI** — works on mobile and desktop

## 🔗 Deployed Contracts (Sepolia)
| Contract        | Address | Etherscan |
|-----------------|---------|-----------|
| SaurabhToken    | 0x...   | [link]()  |
| MerkleAirdrop   | 0x...   | [link]()  |

## 🛠 Tech Stack
| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Smart contracts | Solidity 0.8.20 + OpenZeppelin 5.x  |
| Testing     | Hardhat + Chai + merkletreejs           |
| Frontend    | Next.js 14 (App Router) + TypeScript    |
| Wallet      | wagmi v2 + viem + RainbowKit            |
| Merkle      | merkletreejs + keccak256                |
| CSV parsing | PapaParse                               |
| Styling     | Tailwind CSS + lucide-react             |
| Deploy      | Vercel (frontend) + Hardhat (contracts) |

## 💡 How Merkle Airdrops Work
1. Admin uploads CSV of eligible addresses + amounts
2. Client-side Merkle tree built from the CSV (never touches a server)
3. 32-byte root hash stored on-chain (costs ~$0.50 in gas)
4. User claims → provides Merkle proof → contract verifies → tokens sent
5. Double-claim prevented by on-chain `hasClaimed` mapping

## 🧪 Security Considerations
- Re-entrancy protected via OpenZeppelin `ReentrancyGuard`
- Checks-Effects-Interactions pattern in all state-changing functions
- Proof tied to `msg.sender` — prevents claiming on behalf of others
- Double keccak256 hashing — prevents second preimage attacks

## 🚀 Running Locally
```bash
git clone https://github.com/saurabh0829/merkle-airdrop-dapp
cd merkle-airdrop-dapp
npm install
cp .env.example .env.local   # fill in ALCHEMY_KEY + WALLETCONNECT_ID
npm run dev
```
