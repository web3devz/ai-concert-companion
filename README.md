# 🎤 AI Concert Companion

**AI Concert Companion** is a decentralized application (dApp) designed for live-streamed concerts. Fans can engage in real-time with an AI-powered agent that offers trivia, live reactions, and gamified interactions — all without worrying about gas fees, thanks to Startale Cloud Services’ Account Abstraction tools.

Deployed on the **Soneium Testnet** (with support for Mainnet), this app creates immersive and interactive concert experiences through gasless claps, comments, and dynamic NFT badges for attendees.


## 🚀 Key Features

- 🤖 **AI-Powered Agent** using [GOAT SDK](https://github.com/goat-sdk/goat/) – provides live reactions and trivia.
- 👐 **Gasless Engagement** – powered by [SCS Paymaster](https://public.paymaster.scs.startale.com/v1).
- 🏅 **Dynamic NFT Concert Badges** – earned by attendees during the show.
- 🔐 **Social Login Onboarding** – ERC-7579 Smart Wallets for easy user access.
- ⚡ **Blazing Fast Transactions** – via [SCS Bundler](https://public.soneium-minato.bundler.scs.startale.com/).


## 🛠 Tech Stack

| Layer        | Technology                                        |
|--------------|--------------------------------------------------|
| Frontend     | React + TypeScript                               |
| Blockchain   | Solidity on Soneium                              |
| Toolkits     | `@startale/aa-sdk`, `goat-sdk`, `ethers`, `@openzeppelin/contracts` |

## 🌐 Public RPC Endpoints

- **Bundler**:  
  `https://public.soneium-minato.bundler.scs.startale.com/`
- **Paymaster**:  
  `https://public.paymaster.scs.startale.com/v1`


## 🧑‍💻 Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/web3devzz/ai-concert-companion.git
cd ai-concert-companion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file and include:

```env
VITE_BUNDLER_URL=https://public.soneium-minato.bundler.scs.startale.com/
VITE_PAYMASTER_URL=https://public.paymaster.scs.startale.com/v1
```

### 4. Wallet Onboarding with Social Login

Use `createSmartWallet()` from `@startale/aa-sdk` to enable ERC-7579 Smart Wallets.

### 5. Integrate Paymaster for Gasless UX

```ts
import { PaymasterClient } from '@startale/aa-sdk';

const paymaster = new PaymasterClient({
  url: import.meta.env.VITE_PAYMASTER_URL,
});
```

### 6. Send UserOps via Bundler

```ts
import { BundlerClient } from '@startale/aa-sdk';

const bundler = new BundlerClient({
  url: import.meta.env.VITE_BUNDLER_URL,
});
```

### 7. Integrate GOAT SDK AI Agent

Use the Eliza agent to provide artist facts and contextual messages during the concert.

```ts
import { createElizaAgent } from 'goat-sdk';

const eliza = createElizaAgent();
const response = await eliza.replyTo("Tell me a fun fact about this artist");
```

### 8. Smart Contract for NFT Badge

Use OpenZeppelin’s ERC721:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ConcertBadge is ERC721 {
    uint256 public nextTokenId;
    address public admin;

    constructor() ERC721("ConcertBadge", "CBADGE") {
        admin = msg.sender;
    }

    function mint(address to) external {
        require(msg.sender == admin, "Only admin can mint");
        _mint(to, nextTokenId++);
    }
}
```

Deploy using Hardhat or Remix.


## ✅ Testing Checklist

- [x] Social wallet onboarding
- [x] Gasless claps and comments
- [x] AI agent responses
- [x] NFT badge minting
- [x] Bundler & Paymaster flow


## 🧭 Roadmap

- 🎧 Support for multi-artist concerts
- 📲 Mobile-friendly UI
- 🏆 Badge rarity & leaderboard system
- 🤝 Integration with fan clubs or Discord communities
- 📦 On-chain concert ticket verification


## 🧰 Resources

- [SCS AA Toolkit Docs](https://aa-docs.scs.startale.com/)
- [SCS Portal](https://portal.scs.startale.com/)
- [GOAT SDK](https://github.com/goat-sdk/goat/)
- [Soneium Docs](https://docs.soneium.org/)


## 📄 License

MIT
