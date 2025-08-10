import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ErrorModule = buildModule("ErrorModule", (m) => {
  // 部署 ErrorContract 合约
  const errorContract = m.contract("ErrorContract");

  return { errorContract };
});

export default ErrorModule;
