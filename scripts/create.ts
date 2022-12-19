// This is a helper script to create a round. 
// This should be created via the frontend and this script is meant to be used for quick test
// NOTE: this script deploys a round with a QF voting strategy
import { ethers } from "hardhat";

import * as utils from "../utils";

utils.assertEnvironment();
  
export async function main() {

  const factoryContract = "0x862D7F621409cF572f179367DdF1B7144AcE1c76";
 
  const factory = await ethers.getContractAt('Factory', factoryContract);
  
  const roundTx = await factory.create();

  const receipt = await roundTx.wait();
  let dummyImplementationAddress;

  if (receipt.events) {
    const event = receipt.events.find((e: any) => e.event === 'DummyCreated');
    if (event && event.args) {
      dummyImplementationAddress = event.args.dummyImplementationAddress;
    }
  }

  console.log("Txn hash: " + roundTx.hash);
  console.log("✅ DummyImplementation created: ", dummyImplementationAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
