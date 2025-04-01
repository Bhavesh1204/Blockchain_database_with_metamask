const hre = require("hardhat");

async function main() {
  const BlockchainDatabase = await hre.ethers.getContractFactory("BlockchainDatabase");
  const contract = await BlockchainDatabase.deploy();

  await contract.waitForDeployment();
  console.log("Contract deployed at:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
