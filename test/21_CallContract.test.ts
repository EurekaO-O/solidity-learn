import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { CallContract, OtherContract } from "../typechain-types";

// describe organizes the tests.
// describe 用来组织测试。
describe("Lesson 21: Calling Contracts", function () {

  // A fixture function to set up the initial state.
  // 一个 fixture 函数，用来设置初始状态。
  async function deployContractsFixture() {
    const [owner] = await ethers.getSigners();

    // Deploy OtherContract.
    // 部署 OtherContract。
    const OtherContractFactory = await ethers.getContractFactory("contracts/21_CallContract.sol:OtherContract");
    const otherContract: OtherContract = await OtherContractFactory.deploy();
    
    // Deploy CallContract.
    // 部署 CallContract。
    const CallContractFactory = await ethers.getContractFactory("CallContract");
    const callContract: CallContract = await CallContractFactory.deploy();

    return { callContract, otherContract, owner };
  }

  describe("Function Calls", function () {
    // Test case for callSetX.
    // 针对 callSetX 的测试用例。
    it("Should set X in OtherContract via callSetX", async function () {
      const { callContract, otherContract } = await loadFixture(deployContractsFixture);
      const otherContractAddress = await otherContract.getAddress();
      const newValue = 123;

      // Call setX on OtherContract through CallContract.
      // 通过 CallContract 来调用 OtherContract 上的 setX。
      await callContract.callSetX(otherContractAddress, newValue);

      // Verify that the value of X was updated in OtherContract.
      // 验证 OtherContract 中的 X 值被更新了。
      expect(await otherContract.getX()).to.equal(newValue);

      // Verify that msg.sender in OtherContract was the CallContract's address.
      // 验证 OtherContract 中的 msg.sender 是 CallContract 的地址。
      expect(await otherContract.lastCaller()).to.equal(await callContract.getAddress());
    });

    // Test case for callGetX.
    // 针对 callGetX 的测试用例。
    it("Should get X from OtherContract via callGetX", async function () {
        const { callContract, otherContract } = await loadFixture(deployContractsFixture);
        const otherContractAddress = await otherContract.getAddress();
        const initialValue = await otherContract.getX();

        // Call getX on OtherContract through CallContract.
        // 通过 CallContract 来调用 OtherContract 上的 getX。
        const retrievedValue = await callContract.callGetX(otherContractAddress);

        expect(retrievedValue).to.equal(initialValue);
    });

    // Test case for sending ETH.
    // 针对发送 ETH 的测试用例。
    it("Should send ETH to OtherContract via callSetXAndSendETH", async function () {
        const { callContract, otherContract } = await loadFixture(deployContractsFixture);
        const otherContractAddress = await otherContract.getAddress();
        const newValue = 456;
        const amountToSend = ethers.parseEther("1.0"); // 1 ETH

        // Check initial balance of OtherContract.
        // 检查 OtherContract 的初始余额。
        const initialBalance = await ethers.provider.getBalance(otherContractAddress);
        expect(initialBalance).to.equal(0);

        // Call the function with ETH.
        // 调用函数并附带 ETH。
        await callContract.callSetXAndSendETH(otherContractAddress, newValue, { value: amountToSend });

        // Check final balance of OtherContract.
        // 检查 OtherContract 的最终余额。
        const finalBalance = await ethers.provider.getBalance(otherContractAddress);
        expect(finalBalance).to.equal(amountToSend);

        // Verify X was also set.
        // 验证 X 也被设置了。
        expect(await otherContract.getX()).to.equal(newValue);
    });
  });
});
