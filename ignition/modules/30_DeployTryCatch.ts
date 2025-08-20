import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// 由于我们的 .sol 文件中有多个合约，为了清晰明确，
// 我们给 Module 起一个能反映其主要部署目标的名字。
const TryCatchModule = buildModule("TryCatchModule", (m) => {
  
  // 我们要部署的是 TryCatch 合约。
  // 因为文件名和合约名不完全一致（文件名是 30_TryCatch.sol），
  // 并且文件内有多个合约，最稳妥的做法是使用完全限定名。
  const tryCatchContract = m.contract("contracts/30_TryCatch.sol:TryCatch");

  // 返回部署的合约实例，以便在部署后可以获取其地址等信息。
  return { tryCatchContract };
});

export default TryCatchModule;
