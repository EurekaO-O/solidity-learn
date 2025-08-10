import { expect } from "chai";
import { ethers } from "hardhat";

// 注意：这次我们不需要 fixture，因为每个测试用例的部署方式都不同。
describe("构造函数继承 (Constructor Inheritance)", function () {

  describe("合约 B (在继承时传递参数)", function () {
    it("应该在部署后将状态变量 a 设置为 1", async function () {
      // 1. 获取合约工厂
      const ContractB = await ethers.getContractFactory("B");
      
      // 2. 部署合约，注意这里 deploy() 不需要参数
      const contractB = await ContractB.deploy();
      
      // 3. 断言：验证状态变量 a 的值是否为 1
      expect(await contractB.a()).to.equal(1);
    });
  });

  describe("合约 C (在构造函数中传递参数)", function () {
    it("当用参数 5 部署时，应该将状态变量 a 设置为 25", async function () {
      // 定义我们将要传递的参数
      const constructorArg = 5;
      const expectedValue = 25;

      // 1. 获取合约工厂
      const ContractC = await ethers.getContractFactory("C");

      // 2. 部署合约，并将参数传递给 deploy() 函数
      // ethers.js 会自动将这个参数用于合约 C 的构造函数
      const contractC = await ContractC.deploy(constructorArg);

      // 3. 断言：验证状态变量 a 的值是否为 25
      expect(await contractC.a()).to.equal(expectedValue);
    });

    it("当用参数 10 部署时，应该将状态变量 a 设置为 100", async function () {
      // 另一个测试用例，确保逻辑的普适性
      const constructorArg = 10;
      const expectedValue = 100;

      const ContractC = await ethers.getContractFactory("C");
      const contractC = await ContractC.deploy(constructorArg);

      expect(await contractC.a()).to.equal(expectedValue);
    });
  });
});
