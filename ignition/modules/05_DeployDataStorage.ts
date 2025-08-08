import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DataStorageModule = buildModule("DataStorageModule", (m) => {
  // 部署 DataStorage 合约
  const dataStorage = m.contract("DataStorage");

  return { dataStorage };
});

export default DataStorageModule;