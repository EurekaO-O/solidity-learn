import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Counter, Interact } from "../typechain-types"; // 导入类型定义

describe("接口交互 (Interface Interaction)", function () {

  async function deployInteractionFixture() {
    // 部署 Counter 合约
    const Counter = await ethers.getContractFactory("Counter");
    const counter: Counter = await Counter.deploy();
    
    // 部署 Interact 合约
    const Interact = await ethers.getContractFactory("Interact");
    const interact: Interact = await Interact.deploy();

    return { counter, interact };
  }

  describe("通过 Interact 合约与 Counter 合约交互", function () {
    it("应该能成功读取和增加 Counter 的计数值", async function () {
      const { counter, interact } = await loadFixture(deployInteractionFixture);
      
      // 获取 Counter 合约的地址
      const counterAddress = await counter.getAddress();

      // 1. 验证初始值
      // 通过 Interact 合约调用 getCount，传入 Counter 的地址
      expect(await interact.getCount(counterAddress)).to.equal(0);

      // 2. 调用 increment
      // 通过 Interact 合约调用 incrementCounter，传入 Counter 的地址
      const tx = await interact.incrementCounter(counterAddress);
      // 等待交易完成
      await tx.wait();

      // 3. 验证新值
      // 再次通过 Interact 合约获取计数值，期望它已经变为 1
      expect(await interact.getCount(counterAddress)).to.equal(1);

      // 也可以直接查询 Counter 合约，验证其状态确实改变了
      expect(await counter.count()).to.equal(1);
    });
  });
});
