import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FallbackModule = buildModule("FallbackModule", (m) => {
  // The Fallback contract does not have a constructor,
  // so we don't need to pass any arguments.
  const fallbackContract = m.contract("Fallback");

  return { fallbackContract };
});

export default FallbackModule;