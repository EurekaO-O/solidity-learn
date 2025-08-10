import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OverloadingModule = buildModule("OverloadingModule", (m) => {
  // 部署 Overloading 合约
  const overloading = m.contract("Overloading");

  return { overloading };
});

export default OverloadingModule;
