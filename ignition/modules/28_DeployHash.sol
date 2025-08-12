import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HashModule = buildModule("HashModule", (m) => {
  // Since there are no naming conflicts, we can use the simple contract name.
  const hashContract = m.contract("Hash");

  return { hashContract };
});

export default HashModule;