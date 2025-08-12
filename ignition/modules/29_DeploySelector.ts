import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SelectorModule = buildModule("SelectorModule", (m) => {
  const selectorContract = m.contract("Selector");

  return { selectorContract };
});

export default SelectorModule;