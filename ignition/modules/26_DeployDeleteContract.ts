import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const DeleteContractModule = buildModule("DeleteContractModule", (m) => {
  // We can deploy the DeleteContract with some initial ETH.
  // 我们可以用一些初始 ETH 来部署 DeleteContract。
  const initialEth = m.getParameter("initialEth", ethers.parseEther("1.0"));

  const deleteContract = m.contract("DeleteContract", [], {
    value: initialEth,
  });

  // We also deploy the DeployAndDestroy contract.
  // 我们也部署 DeployAndDestroy 合约。
  const deployAndDestroy = m.contract("DeployAndDestroy");

  return { deleteContract, deployAndDestroy };
});

export default DeleteContractModule;
