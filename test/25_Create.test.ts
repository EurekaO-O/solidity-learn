import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { PairFactory2, Pair } from "../typechain-types";

describe("Lesson 25: Create2", function () {

  async function deployFactoryFixture() {
    const [owner] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("PairFactory2");
    const factory: PairFactory2 = await Factory.deploy();
    
    const tokenA = ethers.Wallet.createRandom().address;
    const tokenB = ethers.Wallet.createRandom().address;

    return { factory, owner, tokenA, tokenB };
  }

  it("should predict the correct pair address and deploy to it", async function () {
    const { factory, tokenA, tokenB } = await loadFixture(deployFactoryFixture);
    const factoryAddress = await factory.getAddress();

    // --- Verification Step 1: Predict the address ---
    // --- 验证步骤 1: 预测地址 ---

    // Call the `calculateAddr` view function on the factory to predict the address.
    // 调用工厂合约上的 `calculateAddr` view 函数来预测地址。
    const predictedAddress = await factory.calculateAddr(tokenA, tokenB);

    // --- Verification Step 2: Deploy the contract ---
    // --- 验证步骤 2: 部署合约 ---

    // Call the createPair2 function to actually deploy the contract.
    // We expect this to emit an event or have some side effect, but we mainly care about the address.
    // 调用 createPair2 函数来实际部署合约。
    // 我们期望它会触发一个事件或产生某些副作用，但我们主要关心的是地址。
    await factory.createPair2(tokenA, tokenB);

    // --- Verification Step 3: Compare the addresses ---
   
    // Get the address of the deployed contract from the factory's state.
    const deployedAddress = await factory.getPair(tokenA, tokenB);

    // The main test: check if the predicted address matches the actual deployed address.
    expect(deployedAddress).to.equal(predictedAddress);

    // --- Optional: Further verification of the new pair contract ---
    // --- 可选：对新 pair 合约的进一步验证 ---
    const pairContract: Pair = await ethers.getContractAt("contracts/25_Create2.sol:Pair", deployedAddress);
    expect(await pairContract.factory()).to.equal(factoryAddress);
  });
});
