import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ConstructorInheritanceModule = buildModule("ConstructorInheritanceModule", (m) => {
  // 部署合约 B，它没有构造函数参数
  const contractB = m.contract("B");

  // 准备合约 C 的构造函数参数
  const cConstructorArg = 5;

  // 部署合约 C，并提供构造函数参数
  // 正确的语法：第二个参数直接就是构造函数参数的数组
  const contractC = m.contract("C", [cConstructorArg]);

  // 返回部署的合约实例
  return { contractB, contractC };
});

export default ConstructorInheritanceModule;
