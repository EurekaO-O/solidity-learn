import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { TestLibrary } from "../typechain-types";

describe("库 (Library)", function () {

  async function deployLibraryFixture() {
    const TestLibrary = await ethers.getContractFactory("TestLibrary");
    const testLibrary: TestLibrary = await TestLibrary.deploy();
    return { testLibrary };
  }

  describe("调用 Strings 库函数", function () {
    it("两种调用方式应该返回相同的结果", async function () {
      const { testLibrary } = await loadFixture(deployLibraryFixture);
      
      const numberToConvert = 170; // 170 的十六进制是 0xaa
      const expectedHexString = "0xaa";

      // 调用方法1 (using for)
      const result1 = await testLibrary.getString1(numberToConvert);
      
      // 调用方法2 (直接调用)
      const result2 = await testLibrary.getString2(numberToConvert);

      // 断言：两种方法的结果都应符合预期
      expect(result1).to.equal(expectedHexString);
      expect(result2).to.equal(expectedHexString);

      // 断言：两种方法的结果应该互相相等
      expect(result1).to.equal(result2);
    });

    it("应该能正确处理 0", async function () {
        const { testLibrary } = await loadFixture(deployLibraryFixture);
        
        const numberToConvert = 0;
        const expectedHexString = "0x00";
  
        const result1 = await testLibrary.getString1(numberToConvert);
        const result2 = await testLibrary.getString2(numberToConvert);
  
        expect(result1).to.equal(expectedHexString);
        expect(result2).to.equal(expectedHexString);
    });
  });
});
