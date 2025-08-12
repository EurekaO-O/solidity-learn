import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { DeleteContract, DeployAndDestroy } from "../typechain-types";

describe("Lesson 26: Delete Contract", function () {

  async function deployContractsFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const DeleteContractFactory = await ethers.getContractFactory("DeleteContract");
    const deleteContract: DeleteContract = await DeleteContractFactory.deploy({ value: ethers.parseEther("1.0") });
    
    const DeployAndDestroyFactory = await ethers.getContractFactory("DeployAndDestroy");
    const deployAndDestroy: DeployAndDestroy = await DeployAndDestroyFactory.deploy();

    return { deleteContract, deployAndDestroy, owner, otherAccount };
  }

  describe("Modern selfdestruct behavior (Post-Cancun)", function () {
    it("Should transfer ETH but NOT delete the contract", async function () {
      const { deleteContract, owner } = await loadFixture(deployContractsFixture);
      const contractAddress = await deleteContract.getAddress();

      // Check initial state
      expect(await deleteContract.getBalance()).to.equal(ethers.parseEther("1.0"));
      expect(await ethers.provider.getCode(contractAddress)).to.not.equal("0x");

      // Get owner's balance before destruction
      const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);

      // Call destroy()
      const tx = await deleteContract.destroy();
      const receipt = await tx.wait();
      const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

      // Check final state of the contract
      expect(await deleteContract.getBalance()).to.equal(0);
      // The code should STILL exist
      expect(await ethers.provider.getCode(contractAddress)).to.not.equal("0x");
      // We should still be able to call view functions
      expect(await deleteContract.value()).to.equal(10);

      // Check owner's balance after destruction
      const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
      // Owner's balance should increase by 1 ETH, minus gas costs
      expect(ownerBalanceAfter).to.equal(ownerBalanceBefore - gasUsed + ethers.parseEther("1.0"));
    });
  });

  describe("Original selfdestruct behavior (Same-transaction create & destroy)", function () {
    it("Should create and then DELETE the contract", async function () {
        const { deployAndDestroy } = await loadFixture(deployContractsFixture);

        // Call the function which returns the address of the created contract
        const createdAddress = await deployAndDestroy.createAndDestroy.staticCall();

        // Actually execute the transaction
        await deployAndDestroy.createAndDestroy();

        // The code at the created address should be GONE (0x)
        expect(await ethers.provider.getCode(createdAddress)).to.equal("0x");
    });
  });
});
