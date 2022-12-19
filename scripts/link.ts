// This script deals with updating
import { ethers } from "hardhat";
import * as utils from "../utils";

utils.assertEnvironment();

export async function main() {

  const factoryContract = "0x862D7F621409cF572f179367DdF1B7144AcE1c76";
  const implementationContract = "0xd39b40aC9279EeeB86FBbDeb2C9acDF16e16cF89";

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
