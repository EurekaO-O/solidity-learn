import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Call, OtherContractV2 } from "../typechain-types";

describe("Lesson 22: Low-level Call", function () {

  async function deployCallFixture() {
    const [owner] = await ethers.getSigners();

    const OtherContractFactory = await ethers.getContractFactory("OtherContractV2");
    const otherContract: OtherContractV2 = await OtherContractFactory.deploy();
    
    const CallFactory = await ethers.getContractFactory("Call");
    const callContract: Call = await CallFactory.deploy();

    return { callContract, otherContract, owner };
  }

  describe("Low-level Call interactions", function () {
    it("Should set X using callSetX", async function () {
      const { callContract, otherContract } = await loadFixture(deployCallFixture);
      const otherContractAddress = await otherContract.getAddress();
      const newValue = 99;

      await callContract.callSetX(otherContractAddress, newValue);

      expect(await otherContract.getX()).to.equal(newValue);
    });

    it("Should get X using callGetX", async function () {
        const { callContract, otherContract } = await loadFixture(deployCallFixture);
        const otherContractAddress = await otherContract.getAddress();
        
        const initialValue = 55;
        await otherContract.setX(initialValue);

        // **FIX**: Use .staticCall to get the return value of a non-view function.
        // **修正**: 使用 .staticCall 来获取一个非 view 函数的返回值。
        const retrievedValue = await callContract.callGetX.staticCall(otherContractAddress);

        expect(retrievedValue).to.equal(initialValue);
    });

    it("Should send ETH and set X using callSetX", async function () {
        const { callContract, otherContract } = await loadFixture(deployCallFixture);
        const otherContractAddress = await otherContract.getAddress();
        const newValue = 77;
        const amountToSend = ethers.parseEther("2.0");

        await callContract.callSetX(otherContractAddress, newValue, { value: amountToSend });

        const finalBalance = await ethers.provider.getBalance(otherContractAddress);
        expect(finalBalance).to.equal(amountToSend);
        expect(await otherContract.getX()).to.equal(newValue);
    });

    it("Should trigger the fallback function via callNonExistent", async function () {
        const { callContract, otherContract } = await loadFixture(deployCallFixture);
        const otherContractAddress = await otherContract.getAddress();

        await expect(callContract.callNonExistent(otherContractAddress))
            .to.emit(otherContract, "Log");
    });
  });
});
