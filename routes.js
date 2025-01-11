const express = require('express');
const { Web3 } = require('web3');
const { Block } = require('./models');
const axios = require('axios');

const router = express.Router();
const web3 = new Web3(process.env.INFURA_URL);

// Get Latest Block
router.get('/latest-block', async (req, res) => {
    console.log("Received request for latest block.");
    try {
        const latestBlockNumber = await web3.eth.getBlockNumber();
        const blockDetails = await web3.eth.getBlock(latestBlockNumber);

        // Convert BigInt values to strings
        res.json({
            number: String(blockDetails.number),
            hash: blockDetails.hash,
            transactions: blockDetails.transactions,
        });
    } catch (error) {
        console.error("Error fetching latest block:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get Last 'n' Blocks
router.get('/blocks/:n', async (req, res) => {
    const n = parseInt(req.params.n);
    const totalBlocks = await Block.countDocuments();

    if (n > totalBlocks) {
        return res.status(400).json({ error: `Requested number exceeds available blocks. Available: ${totalBlocks}` });
    }

    const blocks = await Block.find().sort({ number: -1 }).limit(n);
    res.json(blocks);
});

// Get Account Details
router.get('/account/:address', async (req, res) => {
    const address = req.params.address;
    console.log(`Received request for account details of address: ${address}`);
    try {
        const balance = await web3.eth.getBalance(address);
        const transactions = await getLastNTransactions(address, 10); // Fetch last 10 transactions

        res.json({
            address,
            balance: String(balance),
            transactions,
        });
    } catch (error) {
        console.error("Error fetching account details:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Function to fetch last n transactions for an address
async function getLastNTransactions(address, n) {
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const transactions = response.data.result;

        // Limit to last n transactions
        return transactions.slice(0, n);
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        return [];
    }
}

// Get Token Details
router.get('/token/:address', async (req, res) => {
    const tokenAddress = req.params.address;
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=token&action=getTokenInfo&contractaddress=${tokenAddress}&apikey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const tokenInfo = response.data.result;

        if (tokenInfo) {
            res.json({
                name: tokenInfo.name,
                symbol: tokenInfo.symbol,
                decimals: tokenInfo.decimals,
                totalSupply: String(tokenInfo.totalSupply),
            });
        } else {
            res.status(404).json({ error: "Token not found" });
        }
    } catch (error) {
        console.error("Error fetching token details:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
