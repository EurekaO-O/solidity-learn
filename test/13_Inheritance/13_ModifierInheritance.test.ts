import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("修饰器继承 (Modifier Inheritance)", function () {

  async function deployModifierFixture() {
    // 部署 Identifier 合约，它会自动继承 Base1
    const Identifier = await ethers.getContractFactory("Identifier");
    const identifier = await Identifier.deploy();
    return { identifier };
  }

  describe("getExactDividedBy2And3 函数", function () {
    it("当输入为6的倍数时，应该成功执行并返回正确结果", async function () {
      const { identifier } = await loadFixture(deployModifierFixture);
      
      // 准备一个合法的输入值 (12 是 2 和 3 的公倍数)
      const validDividend = 12;
      const expectedDiv2 = 6;
      const expectedDiv3 = 4;

      // 调用函数并验证返回值
      // `callStatic` 用于模拟调用，它不会创建真实交易，但能获取返回值
      const [div2, div3] = await identifier.getExactDividedBy2And3.staticCall(validDividend);
      
      // 断言返回值是否正确
      expect(div2).to.equal(expectedDiv2);
      expect(div3).to.equal(expectedDiv3);

      // 也可以验证真实交易能成功执行，不会被 revert
      await expect(identifier.getExactDividedBy2And3(validDividend)).to.not.be.reverted;
    });

    it("当输入不是2的倍数时，应该被 revert", async function () {
      const { identifier } = await loadFixture(deployModifierFixture);
      
      // 准备一个非法的输入值 (9)
      const invalidDividend = 9;

      // 断言：期望调用会因为不满足 require(_a % 2 == 0) 而失败
      // 注意：Hardhat/Ethers 无法直接获取 require 的失败原因字符串，
      // 但我们可以验证它确实被 revert 了。
      await expect(identifier.getExactDividedBy2And3(invalidDividend)).to.be.reverted;
    });

    it("当输入不是3的倍数时，应该被 revert", async function () {
      const { identifier } = await loadFixture(deployModifierFixture);
      
      // 准备一个非法的输入值 (10)
      const invalidDividend = 10;

      // 断言：期望调用会因为不满足 require(_a % 3 == 0) 而失败
      await expect(identifier.getExactDividedBy2And3(invalidDividend)).to.be.reverted;
    });
  });
});
