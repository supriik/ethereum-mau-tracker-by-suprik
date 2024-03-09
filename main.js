const Web3 = require('web3');

// Connect to an Ethereum node
const web3 = new Web3('https://mainnet.infura.io/v3/your_infura_project_id');

// Define your contract ABI and address
const contractABI = [
    // Your contract's ABI here
];
const contractAddress = '0xYourContractAddress';

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to track monthly active users
async function trackMonthlyActiveUsers() {
    // Get the current block number
    const currentBlockNumber = await web3.eth.getBlockNumber();

    // Calculate the block number from a month ago (assuming ~30 days per month)
    const blocksPerMonth = 5760 * 30; // Assuming ~15s block time, adjust as per your requirement
    const blockNumberOneMonthAgo = currentBlockNumber - blocksPerMonth;

    // Retrieve events from the contract
    const events = await contract.getPastEvents('YourEventName', {
        fromBlock: blockNumberOneMonthAgo,
        toBlock: 'latest'
    });

    // Extract unique user addresses from events
    const uniqueUsers = new Set();
    events.forEach(event => {
        uniqueUsers.add(event.returnValues.userAddress); // Assuming user address is one of the event parameters
    });

    // Calculate and log the number of monthly active users
    const monthlyActiveUsers = uniqueUsers.size;
    console.log(`Monthly Active Users: ${monthlyActiveUsers}`);
}

// Call the function to track monthly active users
trackMonthlyActiveUsers();
