import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// 定义一个名为 YeyeModule 的部署模块
const YeyeModule = buildModule("YeyeModule", (m) => {
  // 在模块中，部署 Yeye 合约
  const yeye = m.contract("Yeye");

  // 返回部署的合约实例，方便其他模块或脚本引用
  return { yeye };
});

// 定义一个名为 BabaModule 的部署模块
const BabaModule = buildModule("BabaModule", (m) => {
  // 部署 Baba 合约
  const baba = m.contract("Baba");

  return { baba };
});

// 定义一个名为 ErziModule 的部署模块
const ErziModule = buildModule("ErziModule", (m) => {
  // 部署 Erzi 合约
  const erzi = m.contract("Erzi");

  return { erzi };
});

// 定义一个主部署模块，用于将所有子模块组合在一起
// 这是 Hardhat Ignition 的推荐做法，可以清晰地管理依赖关系
const InheritanceModule = buildModule("InheritanceModule", (m) => {
  // 使用 m.useModule() 来调用（并部署）我们上面定义的子模块
  const { yeye } = m.useModule(YeyeModule);
  const { baba } = m.useModule(BabaModule);
  const { erzi } = m.useModule(ErziModule);

  // 主模块返回所有已部署的合约实例
  return { yeye, baba, erzi };
});

// 默认导出主模块
export default InheritanceModule;
