import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ErrorContract } from "../typechain-types";

describe("错误处理 (Errors)", function () {

  async function deployErrorFixture() {
    // 获取两个账户，一个作为 owner，一个作为 attacker
    const [owner, attacker] = await ethers.getSigners();

    const ErrorContract = await ethers.getContractFactory("ErrorContract");
    const errorContract: ErrorContract = await ErrorContract.deploy();

    return { errorContract, owner, attacker };
  }


  /**
   * loadFixture 的作用：

loadFixture 是 Hardhat 提供的一个函数，它的核心作用是避免在每个测试用例中重复执行相同的初始化操作（比如部署合约），从而极大地加快测试速度。

它的工作原理，就像给你的区块链拍“快照”：
   */
  describe("错误处理机制", function () {
    it("方法1: if + revert + 自定义 error 应该失败", async function () {
      const { errorContract, attacker } = await loadFixture(deployErrorFixture);
      
      // 期望调用会因为自定义错误 "TransferNotOwner" 而失败
      // .connect(attacker) 表示让 attacker 这个账户去调用函数
      await expect(
        errorContract.connect(attacker).transferOwner1(1, attacker.address)
      ).to.be.revertedWithCustomError(errorContract, "TransferNotOwner");
    });

    it("方法2: require 应该失败并返回错误字符串", async function () {
      const { errorContract, attacker } = await loadFixture(deployErrorFixture);
      
      // 期望调用会因为 require 的字符串 "Transfer Not Owner" 而失败
      await expect(
        errorContract.connect(attacker).transferOwner2(1, attacker.address)
      ).to.be.revertedWith("Transfer Not Owner");
    });

    it("方法3: assert 应该失败", async function () {
      const { errorContract, attacker } = await loadFixture(deployErrorFixture);
      
      // 期望调用会因为 assert 失败而被 revert
      // assert 失败不会返回特定的错误信息，所以我们只检查 revert
      await expect(
        errorContract.connect(attacker).transferOwner3(1, attacker.address)
      ).to.be.reverted;
    });

    it("Owner 调用应该成功", async function () {
        const { errorContract, owner } = await loadFixture(deployErrorFixture);

        // 期望 owner 调用时，不会被 revert
        await expect(
            errorContract.connect(owner).transferOwner1(1, owner.address)
        ).to.not.be.reverted;
    });
  });
});
