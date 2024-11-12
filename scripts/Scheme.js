const hre = require("hardhat");

const LEGAL_REPORT_TOPIC = 111;
const VALUATION_REPORT_TOPIC = 222;
const IDENTITY_VERIFICATION_TOPIC = 333;
const BANK_ACCOUNT_TOPIC = 444;
const UNIVERSITY_ACCREDITATION_TOPIC = 555;
const GRADUATION_TOPIC = 666;

const LAWYER_CIC = "0xa41C4b590c25ae82d459Cd617f3A6A525A97D66C";
const CA_CIC = "0x0db7b8623DE28cde98DDf56C59a5D461E87360a0";
const UIDAI_CIC = "0x98B11F6e8e2228F394270437936C22Dc348f018F";
const AXIS_BANK_CIC = "0xF92622F661848b00CFC4C2119879dC0699Bd8d79";
const DU_CIC = "0x5E82df943816007F7dfBbd19F5B0995c66A9F64b";

const ALICE_OID = "0x74e871680c47729F8C33C8dE9558E4eCC0D931Dc";
const BOB_OID = "0x6Ae908FEB892a5a7A1C6252C1F8AB05d62211725";

const LEGAL_REPORT_URI =
  "https://jade-responsible-goat-742.mypinata.cloud/files/bafkreibkfwrdbns5iyqvkuvmjfegtj4wgtmb3rlsmbskcdltv4gl25pate?X-Algorithm=PINATA1&X-Date=1731320389&X-Expires=30&X-Method=GET&X-Signature=8c2656fcaec7d7b32445fbc50007799f82501f311726eafb4f60c2689dd37cb1";
const VALUATION_REPORT_URI =
  "https://jade-responsible-goat-742.mypinata.cloud/files/bafkreihyzse4oh62efbkq7647ghj74cre4akwf2p4urz6oevhbyx7uhk34?X-Algorithm=PINATA1&X-Date=1731320507&X-Expires=30&X-Method=GET&X-Signature=459d55267ef8183951b169c685920f4c863a1dacc6ad94ca6575eb0993f91b04";
const IDENTITY_VERIFICATION_URI =
  "https://jade-responsible-goat-742.mypinata.cloud/files/bafkreigbvzsp3tfidcrbk3kyki3rmcurrgn6umv2xccw26rnunm75m7ziq?X-Algorithm=PINATA1&X-Date=1731320537&X-Expires=30&X-Method=GET&X-Signature=74408194a2556976516199a0381274f877059946c7774cd10080107411d4a685";
const BANK_ACCOUNT_URI = "https://jade-responsible-goat-742.mypinata.cloud/ipfs/QmZhKi4PeAvv4gGVicvgqM7jhQa9yJwxyGhhkYPy6WEhAq";
const UNIVERSITY_ACCREDITATION_URI = "https://jade-responsible-goat-742.mypinata.cloud/ipfs/QmTrPJd1siLzzbnLEwgp93fTNijPGn5uxibi6e3y391Mmm";
const GRADUATION_URI = "https://jade-responsible-goat-742.mypinata.cloud/ipfs/QmdrEVr1mgu9WFdXW2kepH44g1VzjCRktk4hRm1dEkqqyd";

async function main() {
  const [deployer, lawyer, ca, uidai, alice, bob] =
    await hre.ethers.getSigners();

  // Deploying schemes
  console.log("\nDeploying schemes...");

  const scheme1 = await hre.ethers.deployContract("Scheme", [
    "Kishan Yojna",
    "MAT",
  ]);
  await scheme1.waitForDeployment();
  
  const scheme2 = await hre.ethers.deployContract("Scheme", [
    "Post Matriculation Scholarship",
    "MAT",
  ]);
  await scheme2.waitForDeployment();

  console.log(
    `${await scheme1.name()} (scheme1) deployed to: ${await scheme1.getAddress()}`
  );
  console.log(
    `${await scheme2.name()} (scheme2) deployed to: ${await scheme2.getAddress()}`
  );

  // Adding claim topics to schemes
  console.log("\nAdding claim topics to schemes...");
  await scheme1.addClaimTopic(111);
  await scheme1.addClaimTopic(222);
  await scheme2.addClaimTopic(333);
  console.log("Claim topics added");

  // Adding trusted issuers to schemes
  console.log("\nAdding trusted issuers to schemes...");
  await scheme1.addTrustedIssuer(LAWYER_CIC, [LEGAL_REPORT_TOPIC]);
  await scheme1.addTrustedIssuer(CA_CIC, [VALUATION_REPORT_TOPIC]);
  await scheme2.addTrustedIssuer(UIDAI_CIC, [IDENTITY_VERIFICATION_TOPIC]);
  console.log("Trusted issuers added");

  // Giving appropriate claims to users
  console.log("\nGenerating claims data...");
  // Generating claims data
  const aliceLegalReportClaim = {
    data: "0x",
    issuer: LAWYER_CIC,
    topic: LEGAL_REPORT_TOPIC,
    scheme: 1,
    identity: ALICE_OID,
    signature: "",
    uri: LEGAL_REPORT_URI,
  };
  aliceLegalReportClaim.signature = lawyer.signMessage(
    hre.ethers.getBytes(
      hre.ethers.keccak256(
        hre.ethers.AbiCoder.defaultAbiCoder().encode(
          ["address", "uint256", "bytes"],
          [
            aliceLegalReportClaim.identity,
            aliceLegalReportClaim.topic,
            aliceLegalReportClaim.data,
          ]
        )
      )
    )
  );

  const aliceValuationReportClaim = {
    data: "0x",
    issuer: CA_CIC,
    topic: VALUATION_REPORT_TOPIC,
    scheme: 1,
    identity: ALICE_OID,
    signature: "",
    uri: VALUATION_REPORT_URI,
  };
  aliceValuationReportClaim.signature = ca.signMessage(
    hre.ethers.getBytes(
      hre.ethers.keccak256(
        hre.ethers.AbiCoder.defaultAbiCoder().encode(
          ["address", "uint256", "bytes"],
          [
            aliceValuationReportClaim.identity,
            aliceValuationReportClaim.topic,
            aliceValuationReportClaim.data,
          ]
        )
      )
    )
  );

  const bobIdentityVerificationClaim = {
    data: "0x",
    issuer: UIDAI_CIC,
    topic: IDENTITY_VERIFICATION_TOPIC,
    scheme: 1,
    identity: BOB_OID,
    signature: "",
    uri: IDENTITY_VERIFICATION_URI,
  };
  bobIdentityVerificationClaim.signature = uidai.signMessage(
    hre.ethers.getBytes(
      hre.ethers.keccak256(
        hre.ethers.AbiCoder.defaultAbiCoder().encode(
          ["address", "uint256", "bytes"],
          [
            bobIdentityVerificationClaim.identity,
            bobIdentityVerificationClaim.topic,
            bobIdentityVerificationClaim.data,
          ]
        )
      )
    )
  );

  // Adding claims to OIDs
  const aliceIdentity = await hre.ethers.getContractAt("IIdentity", ALICE_OID);
  const bobIdentity = await hre.ethers.getContractAt("IIdentity", BOB_OID);
  console.log("Adding claims to OIDs...");
  await aliceIdentity
    .connect(alice)
    .addClaim(
      aliceLegalReportClaim.topic,
      aliceLegalReportClaim.scheme,
      aliceLegalReportClaim.issuer,
      aliceLegalReportClaim.signature,
      aliceLegalReportClaim.data,
      aliceLegalReportClaim.uri
    );
  await aliceIdentity
    .connect(alice)
    .addClaim(
      aliceValuationReportClaim.topic,
      aliceValuationReportClaim.scheme,
      aliceValuationReportClaim.issuer,
      aliceValuationReportClaim.signature,
      aliceValuationReportClaim.data,
      aliceValuationReportClaim.uri
    );
  await bobIdentity
    .connect(bob)
    .addClaim(
      bobIdentityVerificationClaim.topic,
      bobIdentityVerificationClaim.scheme,
      bobIdentityVerificationClaim.issuer,
      bobIdentityVerificationClaim.signature,
      bobIdentityVerificationClaim.data,
      bobIdentityVerificationClaim.uri
    );
  
  // Minting NFTs to users
  console.log("\nMinting NFTs to users...");
  await scheme1.safeMint(alice.address, "", ALICE_OID);
  await scheme2.safeMint(bob.address, "", BOB_OID);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
