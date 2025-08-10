import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ModifierInheritanceModule = buildModule("ModifierInheritanceModule", (m) => {
  // 部署 Identifier 合约
  const identifier = m.contract("Identifier");

  return { identifier };
});

export default ModifierInheritanceModule;
