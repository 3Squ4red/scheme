require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    holesky: {
      url: process.env.HOLESKY_URL,
      accounts: [
        process.env.DEPLOYER,
        process.env.LAWYER,
        process.env.CA,
        process.env.UIDAI,
        process.env.ALICE,
        process.env.BOB,
      ],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
