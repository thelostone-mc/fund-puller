import { ethers, upgrades } from "hardhat";
import hre from "hardhat";
import * as utils from "../utils";

utils.assertEnvironment();

export async function main() {
  // Wait 10 blocks for re-org protection
  const blocksToWait = hre.network.name === "localhost" ? 0 : 10;

  const contractFactory = await ethers.getContractFactory("Factory");
  const contract = await upgrades.deployProxy(contractFactory);

  console.log(`Deploying Upgradable Factory to ${contract.address}`);

  await contract.deployTransaction.wait(blocksToWait);
  console.log("✅ Deployed.");

  return contract.address;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
