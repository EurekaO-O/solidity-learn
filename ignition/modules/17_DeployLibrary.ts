import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LibraryModule = buildModule("LibraryModule", (m) => {
  // 部署 TestLibrary 合约
  // Hardhat Ignition 会自动处理 Strings 库的链接
  const testLibrary = m.contract("TestLibrary");

  return { testLibrary };
});

export default LibraryModule;
