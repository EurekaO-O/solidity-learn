import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FactoryModule2 = buildModule("FactoryModule2", (m) => {
  // Just like with the CREATE factory, we only need to deploy the factory itself.
  // The factory will handle the deployment of Pair contracts using CREATE2.
  // 就像使用 CREATE 的工厂一样，我们只需要部署工厂本身。
  // 这个工厂会使用 CREATE2 来处理 Pair 合约的部署。
  const factory = m.contract("PairFactory2");

  return { factory };
});

export default FactoryModule2;
