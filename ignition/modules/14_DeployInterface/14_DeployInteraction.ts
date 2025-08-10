import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InteractionModule = buildModule("InteractionModule", (m) => {
  // 部署 Counter 合约
  const counter = m.contract("Counter");
  
  // 部署 Interact 合约
  const interact = m.contract("Interact");

  return { counter, interact };
});

export default InteractionModule;