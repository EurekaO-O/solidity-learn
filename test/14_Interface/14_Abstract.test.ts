import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("抽象合约 (Abstract Contract)", function () {

  async function deployAbstractFixture() {
    // 我们不能部署抽象合约 Base，但可以部署它的具体实现 BaseImpl
    const BaseImpl = await ethers.getContractFactory("BaseImpl");
    const baseImpl = await BaseImpl.deploy();
    return { baseImpl };
  }

  describe("BaseImpl 合约", function () {
    it("应该能调用继承自父合约的状态变量 getter", async function () {
      const { baseImpl } = await loadFixture(deployAbstractFixture);
      
      // 断言：调用继承来的 name() 函数，返回值应为 "Base"
      expect(await baseImpl.name()).to.equal("Base");
    });

    it("应该能调用自己实现的函数", async function () {
      const { baseImpl } = await loadFixture(deployAbstractFixture);
      
      // 断言：调用自己实现的 getAlias() 函数，返回值应为 "BaseImpl"
      expect(await baseImpl.getAlias()).to.equal("BaseImpl");
    });
  });
});
