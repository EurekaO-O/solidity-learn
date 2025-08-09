import { expect } from "chai";
import { ethers } from "hardhat";

describe("InsertionSort 合约", function () {
  let contractInstance: any;

  beforeEach(async function () {
    const ContractFactory = await ethers.getContractFactory("InsertionSort");
    contractInstance = await ContractFactory.deploy();
  });

  describe("insertionSort (正确版本)", function () {
    it("应该能正确排序一个乱序数组", async function () {
      const unsortedArray = [5n, 3n, 6n, 2n, 9n, 10n, 7n];
      const expectedArray = [2n, 3n, 5n, 6n, 7n, 9n, 10n];
      expect(await contractInstance.insertionSort(unsortedArray)).to.deep.equal(expectedArray);
    });

    it("应该能正确处理一个已经排好序的数组", async function () {
      const sortedArray = [1n, 2n, 3n, 4n, 5n];
      expect(await contractInstance.insertionSort(sortedArray)).to.deep.equal(sortedArray);
    });

    it("应该能正确处理一个倒序的数组", async function () {
      const reversedArray = [5n, 4n, 3n, 2n, 1n];
      const expectedArray = [1n, 2n, 3n, 4n, 5n];
      expect(await contractInstance.insertionSort(reversedArray)).to.deep.equal(expectedArray);
    });

    it("应该能正确处理一个包含重复元素的数组", async function () {
      const withDuplicates = [5n, 3n, 5n, 2n, 3n];
      const expectedArray = [2n, 3n, 3n, 5n, 5n];
      expect(await contractInstance.insertionSort(withDuplicates)).to.deep.equal(expectedArray);
    });

    it("应该能正确处理一个空数组", async function () {
      const emptyArray: bigint[] = [];
      expect(await contractInstance.insertionSort(emptyArray)).to.deep.equal(emptyArray);
    });
  });

  describe("insertionSortWrong (错误版本)", function () {
    it("当输入会导致 uint 下溢时，交易应该失败", async function () {
      // 这个数组 [2, 1] 会在 j=0 时，尝试执行 j--，从而触发下溢错误
      const unsortedArray = [2n, 1n];
      
      // 我们期望这个调用会失败
      // `revertedWithPanic(0x11)` 是专门用来捕获算术溢出/下溢错误的断言
      await expect(contractInstance.insertionSortWrong(unsortedArray)).to.be.revertedWithPanic(0x11);
    });

    it("对于不会触发下溢的简单情况，它应该能工作", async function () {
        // 这个数组 [1, 2] 不会进入 while 循环的 j--，所以不会报错
        const sortedArray = [1n, 2n];
        expect(await contractInstance.insertionSortWrong(sortedArray)).to.deep.equal(sortedArray);
      });
  });
});
