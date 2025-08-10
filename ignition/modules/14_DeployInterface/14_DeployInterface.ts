import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InterfaceModule = buildModule("InterfaceModule", (m) => {
  // 使用完全限定名称来精确指定要部署哪个 BaseImpl
  const baseImpl = m.contract("contracts/14_Interface/14_Interface.sol:BaseImpl");

  return { baseImpl };
});

export default InterfaceModule;
