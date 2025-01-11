const express = require('express');
const { Web3 } = require('web3');
const { Block } = require('./models');
require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const web3 = new Web3(process.env.INFURA_URL);

const routes = require('./routes');
app.use('/', routes);


// Fetch latest block details and store in MongoDB
async function fetchLatestBlocks() {
    const latestBlockNumber = await web3.eth.getBlockNumber();
    const latestBlockNum = Number(latestBlockNumber);

    for (let i = latestBlockNum; i > latestBlockNum - 100; i--) {
        const block = await web3.eth.getBlock(i);
        try {
            const newBlock = new Block({
                number: String(block.number),
                hash: block.hash,
                transactions: block.transactions,
            });

            await newBlock.save();
            console.log(`Stored block with number: ${block.number}`);
        } catch (err) {
            console.error("Error saving block:", err);
        }

    }
    console.log("Finished storing the last 100 blocks.");
}

// Call fetchLatestBlocks on server start
fetchLatestBlocks();

// Start listening for new blocks and store them in MongoDB
async function listenForNewBlocks() {
    let latestBlockNumber = await web3.eth.getBlockNumber();

    setInterval(async () => {
        const currentBlockNumber = await web3.eth.getBlockNumber();
        if (currentBlockNumber > latestBlockNumber) {
            latestBlockNumber = currentBlockNumber;
            const block = await web3.eth.getBlock(latestBlockNumber);
            const newBlock = new Block({
                number: String(block.number),
                hash: block.hash,
                transactions: block.transactions,
            });
            await newBlock.save();
            console.log(`Stored new block with number: ${block.number}`);
        }
    }, 10000); // Check every 10 seconds
}

// Start listening for new blocks
listenForNewBlocks();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
