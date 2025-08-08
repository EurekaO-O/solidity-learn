import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ArrayAndStructModule = buildModule("ArrayAndStructModule", (m) => {
  // 部署 ArrayAndStruct 合约
  const contract = m.contract("ArrayAndStruct");

  return { contract };
});

export default ArrayAndStructModule;