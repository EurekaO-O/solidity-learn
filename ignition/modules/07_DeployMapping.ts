import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MappingModule = buildModule("MappingModule", (m) => {
  // 使用 m.contract() 方法来指定要部署的合约名称
  const mappingContract = m.contract("Mapping");

  // 将部署的合约实例返回，这样 Ignition 就能追踪它
  return { mappingContract };
});

// 默认导出这个模块
export default MappingModule;