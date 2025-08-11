import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const SendETHModule = buildModule("SendETHModule", (m) => {
  // We deploy the ReceiveETH contract first, as it has no dependencies.
  const receiveContract = m.contract("ReceiveETH");

  // We deploy the SendETH contract and send 10 ETH to its constructor.
  const tenEther = ethers.parseEther("10.0");
  const sendContract = m.contract("SendETH", [], {
    value: tenEther,
  });

  return { receiveContract, sendContract };
});

export default SendETHModule;
