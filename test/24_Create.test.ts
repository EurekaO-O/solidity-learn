import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { PairFactory, Pair } from "../typechain-types";

// A bilingual describe block for our test suite.
// 一个双语的 describe 块，用于我们的测试套件。
describe("Lesson 24: Create (Factory Pattern)", function () {

  // A fixture to deploy the PairFactory contract.
  // 一个 fixture，用于部署 PairFactory 合约。
  async function deployFactoryFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    // Deploy the PairFactory contract.
    // 部署 PairFactory 合约。
    const Factory = await ethers.getContractFactory("PairFactory");
    const factory: PairFactory = await Factory.deploy();
    
    // We will use two random addresses to simulate token addresses.
    // 我们将使用两个随机地址来模拟代币地址。
    const tokenA = ethers.Wallet.createRandom().address;
    const tokenB = ethers.Wallet.createRandom().address;

    return { factory, owner, tokenA, tokenB };
  }

  // The main test case.
  // 主要的测试用例。
  it("should create a new pair contract and initialize it", async function () {
    const { factory, tokenA, tokenB } = await loadFixture(deployFactoryFixture);
    const factoryAddress = await factory.getAddress();

    // Call the createPair function.
    // 调用 createPair 函数。
    const tx = await factory.createPair(tokenA, tokenB);
    await tx.wait(); // Wait for the transaction to be mined. 等待交易被打包。

    // --- Verification Step 1: Check the factory's state ---
    // --- 验证步骤 1: 检查工厂的状态 ---

    // Get the address of the newly created pair from the factory's state.
    // 从工厂的状态中获取新创建的 pair 合约地址。
    const pairAddress = await factory.getPair(tokenA, tokenB);
    
    // Check that the address is not the zero address, which means it was created.
    // 检查该地址不是零地址，这意味着它已被创建。
    expect(pairAddress).to.not.equal(ethers.ZeroAddress);
    
    // Check that the allPairs array contains the new pair address.
    // 检查 allPairs 数组包含新的 pair 地址。
    expect(await factory.allPairs(0)).to.equal(pairAddress);

    // --- Verification Step 2: Check the new pair contract's state ---
    // --- 验证步骤 2: 检查新 pair 合约的状态 ---

    // To interact with the newly created Pair contract, we need to create an instance of it.
    // We use `ethers.getContractAt` to attach to an already deployed contract.
    // 为了与新创建的 Pair 合约交互，我们需要为它创建一个实例。
    // 我们使用 `ethers.getContractAt` 来连接到一个已经部署的合约。
    const pairContract: Pair = await ethers.getContractAt("Pair", pairAddress);

    // Now, we can check the state variables of the new Pair contract.
    // 现在，我们可以检查新的 Pair 合约的状态变量了。
    expect(await pairContract.factory()).to.equal(factoryAddress);
    expect(await pairContract.token0()).to.equal(tokenA);
    expect(await pairContract.token1()).to.equal(tokenB);
  });
});
