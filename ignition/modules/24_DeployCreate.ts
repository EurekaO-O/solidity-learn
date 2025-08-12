import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FactoryModule = buildModule("FactoryModule", (m) => {
  // For a factory pattern, we only need to deploy the factory contract.
  // The factory contract will then deploy the Pair contracts on its own.
  // 对于工厂模式，我们只需要部署工厂合约。
  // 工厂合约之后会自己去部署 Pair 合约。
  const factory = m.contract("PairFactory");

  // We return the factory instance so we can interact with it after deployment.
  // 我们返回 factory 实例，以便在部署后能与它交互。
  return { factory };
});

export default FactoryModule;
