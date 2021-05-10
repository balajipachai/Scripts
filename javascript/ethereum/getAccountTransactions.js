const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8501'))
const util = require('util')
const fs = require('fs')
const stream = require('stream')
const { once } = require('events')

const finished = util.promisify(stream.finished);

async function writeTxsToFile(iterable, filePath) {
    const writable = fs.createWriteStream(filePath, { encoding: 'utf8' });
    for await (const chunk of iterable) {
        if (!writable.write(chunk)) {
            await once(writable, 'drain');
        }
    }
    writable.end();
    await finished(writable);
}

async function transactionsOfAccount(accountAddress, filterParams) {
    const { fromBlock, toBlock } = filterParams;
    let accountTransactions = [];
    let blocksRange = []
    for (let index = Number(fromBlock); index < Number(toBlock); index++) {
        blocksRange.push(index)
    }
    for await (const blkNumber of blocksRange) {
        const blk = await web3.eth.getBlock(blkNumber)
        const blkTxs = blk.transactions
        if (blkTxs.length) {
            for await (const tx of blkTxs) {
                const txDetails = await web3.eth.getTransaction(tx)
                if (txDetails.from.toLowerCase() == accountAddress) {
                    accountTransactions.push(JSON.stringify(txDetails)) // TODO Imrove this to write the correct json with commas etc
                    accountTransactions.push(",")
                }
            }
        }
    }
    await writeTxsToFile(accountTransactions, './accountTransactions.json')
    console.log("Account transactios are written to accountTransaction.json file");
}

transactionsOfAccount('0x71e47392b432fd0e15d9b1749d906adbddeffa74', { fromBlock: 4284, toBlock: 4290 })