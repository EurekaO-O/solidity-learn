import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Overloading } from "../typechain-types";

describe("函数重载 (Function Overloading)", function () {

  async function deployOverloadingFixture() {
    const Overloading = await ethers.getContractFactory("Overloading");
    const overloading: Overloading = await Overloading.deploy();
    return { overloading };
  }

  describe("saySomething 函数重载", function () {
    it("调用无参数版本，应返回 'Nothing'", async function () {
      const { overloading } = await loadFixture(deployOverloadingFixture);
      
      // 直接调用无参数版本
      expect(await overloading["saySomething()"]()).to.equal("Nothing");
    });

    it("调用带 string 参数版本，应返回传入的字符串", async function () {
      const { overloading } = await loadFixture(deployOverloadingFixture);
      const message = "Hello, Overloading!";
      
      // 直接调用带参数版本
      expect(await overloading["saySomething(string)"](message)).to.equal(message);
  });

  describe("f 函数重载", function () {
    it("应能精确调用 uint8 版本", async function () {
      const { overloading } = await loadFixture(deployOverloadingFixture);
      const input = 50;
      
      // 关键：使用函数签名的字符串形式来精确指定要调用的重载函数
      // 语法：contract['functionName(paramType1,paramType2,...)'](args)
      const result = await overloading["f(uint8)"](input);
      
      expect(result).to.equal(input);
    });

    it("应能精确调用 uint256 版本", async function () {
      const { overloading } = await loadFixture(deployOverloadingFixture);
      const input = 1000;
      
      // 同样，使用函数签名字符串来调用 uint256 版本
      const result = await overloading["f(uint256)"](input);

      expect(result).to.equal(input);
    });
  });
}); 
});
