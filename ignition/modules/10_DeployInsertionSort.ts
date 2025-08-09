import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InsertionSortModule = buildModule("InsertionSortModule", (m) => {
  const insertionSortContract = m.contract("InsertionSort");

  return { insertionSortContract };
});

export default InsertionSortModule;