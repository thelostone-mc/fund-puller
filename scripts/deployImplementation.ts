// This script deals with deploying the RoundImplementation on a given network
import { ethers } from "hardhat";
import hre from "hardhat";
import * as utils from "../utils";

utils.assertEnvironment();

export async function main() {
  // Wait 10 blocks for re-org protection
  const blocksToWait = hre.network.name === "localhost" ? 0 : 10;

  const contractFactory = await ethers.getContractFactory(
    "Implementation"
  );
  const contract = await contractFactory.deploy();

  console.log(`Deploying Implementation to ${contract.address}`);
  await contract.deployTransaction.wait(blocksToWait);
  console.log("✅ Deployed");

  return contract.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
