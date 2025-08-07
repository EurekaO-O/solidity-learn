import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// 创建一个部署模块，给它一个ID "HelloWeb3Module"
const HelloWeb3Module = buildModule("HelloWeb3Module", (m) => {

  // "m.contract" 就是一个声明，告诉Ignition我们要部署一个名为 "HelloWeb3" 的合约
  // 注意，这里的 "HelloWeb3" 必须和你 contracts 文件夹里的合约名完全一样
  const helloWeb3 = m.contract("HelloWeb3");

  // 将部署的合约实例返回，这样部署成功后，我们可以获取到它的信息
  return { helloWeb3 };
});

// 导出这个模块
export default HelloWeb3Module;
