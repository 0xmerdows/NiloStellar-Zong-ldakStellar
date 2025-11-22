StellarVote is a modern, responsive React-based frontend interface designed for a Decentralized Autonomous Organization (DAO) voting system. It simulates a blockchain-based voting experience on the Stellar Network, featuring token-gated polls, real-time result visualization, and gamified user profiles.

🚀 Project Overview
This project demonstrates a sophisticated UI/UX for blockchain governance. It allows users to connect a wallet, participate in community decisions, and earn badges for their activity. The application handles various voting scenarios, including public polls and exclusive "Board Member" polls that require specific asset holdings.

✨ Key Features
1. Voting Mechanics
Memo-Based Voting Simulation: Mimics the Stellar network's voting method where votes are cast via transactions containing specific "Memos."

Token-Gated Governance: Logic to restrict specific polls only to users holding certain tokens (e.g., BOARD_MEMBER token required for treasury decisions).

Live Result Visualization: Dynamic progress bars that update instantly upon voting, calculating percentages and total participation.

Locked Results: Results remain hidden (blind voting) until the user casts their vote to prevent bias.

2. User Interface (UI) & UX
Interactive Voting Booth: A sticky sidebar "Voting Booth" that follows the user, providing a seamless checkout-like experience for casting votes.

Responsive Design: Fully optimized for both Desktop and Mobile (includes a bottom navigation bar for mobile users).

Dark Mode Aesthetics: A sleek, modern gradient design using Tailwind CSS with glassmorphism effects (backdrop-blur).

QR Code Integration: Ability to display wallet addresses as QR codes for mobile wallet scanning.

3. Social & Gamification
Discussion Boards: A comment section for each poll allowing users to discuss options before voting.

Profile & Badges: An achievement system that unlocks NFT-style badges (e.g., "First Vote," "DAO Expert") based on user activity.

Wallet Simulation: A mock wallet connection flow that simulates public keys, balances, and token holdings.

🛠 Tech Stack
Framework: React (Next.js App Router structure)

Styling: Tailwind CSS

Icons: Inline SVG Icons (Lucide-style)

State Management: React Hooks (useState, useEffect, useRef)

🧩 How It Works (Current Logic)
The application currently runs in Simulation Mode:

Data Structure: Polls are stored in a local constant INITIAL_POLLS.

Wallet Connection: The mockStellar object simulates an asynchronous connection to a wallet (like Freighter), returning a dummy public key and a list of held tokens.

Voting Process:

The user selects an option.

The app checks if the user has the required tokens.

Upon confirmation, it triggers a fake payment delay.

The local state is updated to reflect the new vote count and the "Voted" status.

🗺 Roadmap & Future Improvements
The following features are planned or recommended to turn this prototype into a production-ready dApp:

1. Real Blockchain Integration
Wallet Support: Replace mockStellar with Freighter or Albedo wallet SDKs to sign real transactions.

Horizon API: Fetch real account balances and transaction history from the Stellar Ledger instead of static data.

Smart Contracts (Soroban): Move the voting logic (counting and validation) to Soroban smart contracts for immutable trustless execution.

2. Backend & Data Persistence
Database: Connect to a backend (Node.js/Supabase) to store poll metadata (titles, descriptions, comments) off-chain to save gas costs.

IPFS: Store heavy assets (like poll images or detailed proposal PDFs) on IPFS.

3. Advanced Governance Features
Quadratic Voting: Implement logic where voting power decreases as more votes are used on a single option.

Delegation: Allow users to delegate their voting power (tokens) to another trusted community member.

Multi-Sig Support: Enable polls that execute transactions automatically (e.g., moving funds from a treasury) upon passing, using Multi-Signature accounts.

📸 Visuals & Diagrams
User Flow (Current Implementation)
Code Structure
Bash

src/
├── components/
│   ├── Icons.tsx       # SVG Icon definitions
│   ├── PollChart.tsx   # Visual result bars
│   ├── QRModal.tsx     # QR Code popup
│   └── ...
├── data/
│   └── mocks.ts        # Initial poll data and mock wallet logic
└── page.tsx            # Main application logic
📦 Installation
Clone the repository.

Install dependencies:

Bash

npm install
Run the development server:

Bash


<img width="1913" height="949" alt="Ekran görüntüsü 2025-11-22 193206" src="https://github.com/user-attachments/assets/d14b73ce-63d8-4142-b155-19a7cf34f9d9" />

<img width="452" height="149" alt="Ekran görüntüsü 2025-11-22 194806" src="https://github.com/user-attachments/assets/689045f3-e261-4584-882c-7f1daf3e0eda" />
<img width="1912" height="952" alt="Ekran görüntüsü 2025-11-22 193220" src="https://github.com/user-attachments/assets/21484a8f-7010-4a04-a806-71ce5b049723" />
<img width="1909" height="955" alt="Ekran görüntüsü 2025-11-22 193152" src="https://github.com/user-attachments/assets/577a8531-fa59-45f4-90c8-f142d50ebda7" />


npm run dev
License: MIT

Version: 2.2
