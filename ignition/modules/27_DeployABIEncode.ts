import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ABIEncodeModule = buildModule("ABIEncodeModule", (m) => {
  // Deploy the ABIEncode contract.
  // 部署 ABIEncode 合约。
  const abiEncode = m.contract("ABIEncode");

  return { abiEncode };
});

export default ABIEncodeModule;
