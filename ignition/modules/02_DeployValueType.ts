import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// 定义一个模块，名字叫 "ValueTypeModule"
const ValueTypeModule = buildModule("ValueTypeModule", (m) => {
  // 从 "02_ValueType.sol" 文件中获取合约，合约名是 "ValueType"
  const valueType = m.contract("ValueType");

  // 返回部署的合约，这样部署后可以获取到它
  return { valueType };
});

// 导出这个模块
export default ValueTypeModule;
