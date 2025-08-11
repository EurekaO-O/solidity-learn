import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CallContractModule = buildModule("CallContractModule", (m) => {
  // Deploy the OtherContract first.
  // We must use the fully qualified name to avoid ambiguity.
  const otherContract = m.contract(
    "contracts/21_CallContract.sol:OtherContract"
  );

  // Deploy the CallContract.
  const callContract = m.contract("CallContract");

  return { otherContract, callContract };
});

export default CallContractModule;
