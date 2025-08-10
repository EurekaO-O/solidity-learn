import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AbstractModule = buildModule("AbstractModule", (m) => {
  // 部署 BaseImpl 合约
  const baseImpl = m.contract("BaseImpl", [], {
    id: "BaseImpl_Abstract", // 为这个部署指定一个唯一的ID，避免命名冲突
  });

  return { baseImpl };
});

export default AbstractModule;
