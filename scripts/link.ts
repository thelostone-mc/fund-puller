// This script deals with updating
import { ethers } from "hardhat";
import * as utils from "../utils";

utils.assertEnvironment();

export async function main() {

  const factoryContract = "0x9Cb7f434aD3250d1656854A9eC7A71EceC6eE1EF";
  const implementationContract = "0xaaC049bE4ccaE52D981585371829b5aEc4a13F53";

  const factory = await ethers.getContractAt('Factory', factoryContract);
  
  // Update RoundImplementation 
  const updateTx = await factory.updateImplementationContract(implementationContract)
  await updateTx.wait();

  console.log("✅ ImplementationContract Contract linked to Factory Contract", updateTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
