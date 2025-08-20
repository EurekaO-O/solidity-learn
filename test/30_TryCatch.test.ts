import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { TryCatch, OtherContract } from "../typechain-types";

describe("Lesson 30: Try/Catch", function () {

  // 使用 loadFixture 是一种最佳实践，它可以在每个 `it` 测试用例开始前，
  // 快速将区块链重置到一个固定的初始状态（这里是合约部署完成的状态）。
  async function deployTryCatchFixture() {
    // 由于我们的 `30_TryCatch.sol` 文件中有两个合约，
    // 为了避免命名冲突，这里使用完全限定名来获取合约工厂。
    const TryCatchFactory = await ethers.getContractFactory("contracts/30_TryCatch.sol:TryCatch");
    const tryCatchContract: TryCatch = await TryCatchFactory.deploy();
    
    // 我们还需要获取 `OtherContract` 的实例，以便后续进行交互和解析自定义错误。
    // `tryCatchContract.otherContract()` 会返回部署在 constructor 中的 `OtherContract` 的地址。
    const otherContractAddress = await tryCatchContract.otherContract();
    const OtherContractFactory = await ethers.getContractFactory("contracts/30_TryCatch.sol:OtherContract");
    const otherContract: OtherContract = OtherContractFactory.attach(otherContractAddress) as OtherContract;

    return { tryCatchContract, otherContract };
  }

  describe("External Call Handling", function () {
    it("Should emit CallSuccess when calling mustBeEven with an even number", async function () {
      const { tryCatchContract } = await loadFixture(deployTryCatchFixture);
      // 传入偶数 10，期望调用成功
      await expect(tryCatchContract.executeExternalCall(10))
        .to.emit(tryCatchContract, "CallSuccess");
    });

    it("Should catch and emit CaughtError when calling mustBeEven with an odd number", async function () {
      const { tryCatchContract } = await loadFixture(deployTryCatchFixture);
      // 传入奇数 11，期望捕获到 require 的错误
      await expect(tryCatchContract.executeExternalCall(11))
        .to.emit(tryCatchContract, "CaughtError")
        .withArgs("Input must be an even number"); // 验证错误信息是否完全匹配
    });
  });

  describe("Panic Error Handling", function () {
    it("Should emit CallSuccess when calling causePanic with a non-zero number", async function () {
      const { tryCatchContract } = await loadFixture(deployTryCatchFixture);
      // 传入非零数字 5，期望调用成功
      await expect(tryCatchContract.executePanic(5))
        .to.emit(tryCatchContract, "CallSuccess");
    });

    it("Should catch and emit CaughtPanic when calling causePanic with zero", async function () {
      const { tryCatchContract } = await loadFixture(deployTryCatchFixture);
      const PANIC_CODE_DIV_BY_ZERO = 0x12; // Solidity 中除以零的 Panic 错误码
      // 传入 0，期望捕获到 Panic 错误
      await expect(tryCatchContract.executePanic(0))
        .to.emit(tryCatchContract, "CaughtPanic")
        .withArgs(PANIC_CODE_DIV_BY_ZERO); // 验证错误码是否为 0x12
    });
  });

  describe("Custom Error Handling", function () {
    it("Should emit CallSuccess when calling throwCustomError with a small number", async function () {
      const { tryCatchContract } = await loadFixture(deployTryCatchFixture);
      // 传入小于等于 10 的数字 5，期望调用成功
      await expect(tryCatchContract.executeCustomError(5))
        .to.emit(tryCatchContract, "CallSuccess");
    });

    it("Should catch and emit CaughtLowLevel for a custom error", async function () {
      const { tryCatchContract, otherContract } = await loadFixture(deployTryCatchFixture);
      const [owner] = await ethers.getSigners();
      const valueToFail = 15;
      const tryCatchContractAddress = await tryCatchContract.getAddress();

      // 为了验证捕获到的 lowLevelData，我们首先需要在客户端构建出这个自定义错误的 calldata。
      // `otherContract.interface.encodeErrorResult` 是一个非常有用的函数，
      // 它可以根据错误名和参数，编码出与合约中 `revert MyCustomError(...)` 完全一致的字节数据。
      const expectedErrorData = otherContract.interface.encodeErrorResult(
        "MyCustomError",
        [tryCatchContractAddress, valueToFail]
      );

      // 传入大于 10 的数字 15，期望捕获到自定义错误
      await expect(tryCatchContract.executeCustomError(valueToFail))
        .to.emit(tryCatchContract, "CaughtLowLevel")
        .withArgs(expectedErrorData); // 验证捕获到的字节数据是否与我们预期的一致
    });
  });
});
