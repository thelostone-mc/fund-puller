import * as dotenv from "dotenv";

dotenv.config();


/**
 * Asserts that environment variables are set as expected
 */
export const assertEnvironment = () => {
  if (!process.env.DEPLOYER_PRIVATE_KEY) {
    console.error("Please set your DEPLOYER_PRIVATE_KEY in a .env file");
  }
  if (!process.env.INFURA_ID) {
    console.error("Please set your INFURA_ID in a .env file");
  }
}
