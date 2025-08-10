import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OwnableModule = buildModule("ModifierModule", (m) => {
  const ownableContract = m.contract("Modifier");

  return { ownableContract };
});

export default OwnableModule;