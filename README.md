**The Energy Trading System is a decentralized Web3 application that enables:**
•	MetaMask wallet connection
•	Meter registration
•	Energy token management
•	Energy marketplace listing
•	Energy purchase and sale
•	Transaction tracking
•	Admin dashboard
**Technology Stack:**
•	Solidity
•	Foundry
•	OpenZeppelin
•	Next.js
•	React
•	Ethers.js
•	MetaMask
•	Alchemy
•	Sepolia Testnet

**Clone Repository**
git clone <https://github.com/rocksun1983.git>
cd EnergyTradingSystem

**Install Foundry**
Linux / WSL:
curl -L https://foundry.paradigm.xyz | bash
foundryup
Verify:
forge --version
cast --version

**Install Smart Contract Dependencies**
mkdir -p lib

cd lib

git clone https://github.com/OpenZeppelin/openzeppelin-contracts.git

git clone https://github.com/foundry-rs/forge-std.git

cd ..

**Configure Environment Variables**
Create:
.env
Example:
export SEPOLIA_RPC_URL="YOUR_ALCHEMY_RPC_URL"

export PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"

export ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"

**Load variables:**
source .env
**Verify:**
echo $SEPOLIA_RPC_URL

**Build Smart Contracts**
forge clean

forge build

**Run Smart Contract Tests**
forge test -vv

**Tests cover:**
•	Token deployment
•	Meter registration
•	Energy listing
•	Energy purchase
•	Marketplace pause
•	Security validation

**Deploy Contracts to Sepolia**
Ensure wallet contains Sepolia ETH.
**Deploy:**
forge script script/Deploy.s.sol:Deploy \
--rpc-url $SEPOLIA_RPC_URL \
--private-key $PRIVATE_KEY \
--broadcast


**Update Frontend Contract Addresses**
Edit:
frontend/utils/contracts.js
Update:
export const ENERGY_TOKEN =
"DEPLOYED_TOKEN_ADDRESS";

export const METER_REGISTRY =
"DEPLOYED_METER_ADDRESS";

export const MARKETPLACE =
"DEPLOYED_MARKETPLACE_ADDRESS";

**Install Frontend Dependencies**
cd frontend

npm install

**Start Frontend**
npm run dev
Application URL:
http://localhost:3000

**Connect MetaMask**
Requirements:
•	MetaMask Installed
•	Sepolia Network Selected
**Connect wallet:**
1.	Open application
2.	Click Connect MetaMask
3.	Approve wallet connection

**Functional Testing**
Meter Registration
1.	Enter meter number
2.	Click Register
3.	Confirm transaction
Expected:
Meter Registered Successfully

**Sell Energy**
1.	Enter energy units
2.	Enter price
3.	Click List Energy
4.	Confirm transaction
Expected:
Listing appears in marketplace

**Buy Energy**
1.	Select listing
2.	Click Buy
3.	Approve token transfer
4.	Confirm purchase
Expected:
Listing marked inactive

**Token Balance**
Dashboard automatically displays:
•	Connected wallet
•	Energy token balance

**Marketplace**
Dashboard displays:
•	Listing ID
•	Seller
•	Units
•	Price
•	Status
**Verify Deployment**
Check contracts on Sepolia:
cast call <marketplace-address> \
"listingCounter()(uint256)" \
--rpc-url $SEPOLIA_RPC_URL
**Check token balance:**
cast call <token-address> \
"balanceOf(address)(uint256)" \
<wallet-address> \
--rpc-url $SEPOLIA_RPC_URL

**Expected Result**
The system will allow users to:
✓ Connect MetaMask
✓ Register a meter
✓ View token balance
✓ List energy for sale
✓ Purchase energy
✓ View marketplace listings
✓ Access transaction history
✓ Use admin dashboard functions
