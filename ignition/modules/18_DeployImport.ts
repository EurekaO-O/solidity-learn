import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ImportModule = buildModule("ImportModule", (m) => {
  // 部署 Import 合约
  // 它继承了 Ownable，构造函数会自动设置 owner
  // 它的构造函数还会自动部署一个新的 OtherContract 实例
  const importContract = m.contract("Import");

  return { importContract };
});

export default ImportModule;
