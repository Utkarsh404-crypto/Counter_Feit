// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const Web3 = require('web3');
const ganacheProvider = 'http://localhost:7545'; // Replace with your Ganache provider URL
const web3 = new Web3(ganacheProvider);
const hre = require("hardhat");

async function main() {
    web3.eth.defaultAccount = '0x9699B575dF0947B700c08b3eC363cc625DaB7e52';

    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    const lockedAmount = hre.ethers.utils.parseEther("1");

    const Manufacturer = await hre.ethers.getContractFactory("Manufacturer");
    const Supplier = await hre.ethers.getContractFactory("Supplier");
    const Customer = await hre.ethers.getContractFactory("ProductVerifier");

    const manufacturerInstance = await Manufacturer.deploy();

    await manufacturerInstance.deployed();

    const supplierInstance = await Supplier.deploy();

    await supplierInstance.deployed();

    const customerInstance = await Customer.deploy(supplierInstance.address);


    await customerInstance.deployed();
    console.log(
        `Deployed manufacturer instance` +
        `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${manufacturerInstance.address}`
    );
    console.log(
        `Deployed supplier instance` +
        `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${supplierInstance.address}`
    );
    console.log(
        `Deployed customer instance` +
        `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${customerInstance.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});