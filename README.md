# Etherscan Backend

## Overview
This project is a backend service for interacting with Ethereum blockchain data. It fetches block data and stores it in a MongoDB database for further analysis.

## Features
- Fetches the **latest block** from the Ethereum blockchain.
- Provides details of the **last ‘n’ blocks**.
- Retrieves **account details** of a particular address, including ETH balance and last ‘n’ transactions.
- Fetches details of different **ERC20 tokens** provided their addresses.
- All data is fetched from the **Ethereum mainnet**.
- On server startup, it fetches the last **100 blocks** and stores them in MongoDB. New blocks are added automatically to the database.
- If the value of ‘n’ in the second requirement doesn’t exceed the number of blocks stored already in the database, data is fetched from the database itself.
- **Dockerized** for easy deployment using `docker-compose up`.

## Prerequisites
- Node.js (version 14 or later)
- npm (Node package manager)
- MongoDB (for local development)
- Docker (for containerized deployment)

## Getting Started

### Running Locally
1. Clone the repository
2. Install dependencies: `npm install` 
3. Create a `.env` file in the root directory with the following content:
   
- ETHERSCAN_API_KEY=YOUR_API_KEY_HERE

- MONGODB_URI=mongodb://localhost:27017/etherscan

- INFURA_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
 
4. Start the application: `npm run dev`
5. Access the application at `http://localhost:3000`.

### Running with Docker
1. Ensure Docker is installed and running on your machine.
2. Build and start the containers: `docker-compose up --build`
3. Access the application at `http://localhost:3000`.
4. Connect to MongoDB using Compass at `mongodb://localhost:27017/etherscan`.

## Testing Endpoints with Postman
You can test the following endpoints using Postman:

1. **Get Latest Block**
- **Endpoint**: `GET /api/latest-block`
- **Description**: Retrieves the latest block information.
2. **Get Last n Blocks**
- **Endpoint**: `GET /api/blocks/n`
- **Description**: Retrieves details of the last 'n' blocks.
3. **Get Account Details**
- **Endpoint**: `GET /api/account/:address`
- **Description**: Retrieves account details including ETH balance and last 'n' transactions.
4. **Get ERC20 Token Details**
- **Endpoint**: `GET /api/token/:address`
- **Description**: Retrieves details of a specific ERC20 token by its address.

## Project Screenshots

1. **Application Running Locally**:

<img width="442" alt="1" src="https://github.com/user-attachments/assets/f2c2353e-308f-4b87-aefc-1957e0741f0f" />
<img width="211" alt="2" src="https://github.com/user-attachments/assets/bf88c402-c001-4ead-b443-a50a5715119e" />


   
2. **MongoDB Compass**:

<img width="749" alt="3" src="https://github.com/user-attachments/assets/84c45c02-0d2d-4ac8-a572-b7415d94a992" />



3. **Docker Logs**:
   
<img width="502" alt="4" src="https://github.com/user-attachments/assets/81ee4b45-29ec-4e1a-aa52-5dc264e3ee3e" />
<img width="786" alt="5" src="https://github.com/user-attachments/assets/1e438839-da58-4b84-9b7e-5284e3cac9c9" />
<img width="775" alt="6" src="https://github.com/user-attachments/assets/83f6d736-2f5a-4cb9-b2af-c11f47b5414b" />



4. **Docker Setup**:

<img width="959" alt="7" src="https://github.com/user-attachments/assets/750238db-dbd7-4d3a-bf3f-0feeb6aac57b" />



5. **Postman Testing**:

<img width="640" alt="8" src="https://github.com/user-attachments/assets/34b99e4b-77a2-483e-af53-8b498ab14616" />



