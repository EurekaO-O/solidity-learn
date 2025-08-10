import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DiamondInheritanceModule = buildModule("DiamondInheritanceModule", (m) => {
  // 部署 people 合约
  // Hardhat Ignition 会自动处理其父合约 (Adam, Eve, God) 的依赖关系
  const people = m.contract("people");

  return { people };
});

export default DiamondInheritanceModule;
