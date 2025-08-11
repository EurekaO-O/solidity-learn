import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DelegatecallModule = buildModule("DelegatecallModule", (m) => {
  // Deploy contract C (the logic contract).
  // 部署合约 C (逻辑合约)。
  const contractC = m.contract("C");

  // Deploy contract B (the storage/proxy contract).
  // 部署合约 B (存储/代理合约)。
  const contractB = m.contract("B");

  return { contractC, contractB };
});

export default DelegatecallModule;
