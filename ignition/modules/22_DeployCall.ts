import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CallModule = buildModule("CallModule", (m) => {
  // Deploy the OtherContractV2 first.
  // 首先部署 OtherContractV2。
  const otherContract = m.contract("OtherContractV2");

  // Deploy the Call contract.
  // 部署 Call 合约。
  const callContract = m.contract("Call");

  return { otherContract, callContract };
});

export default CallModule;
