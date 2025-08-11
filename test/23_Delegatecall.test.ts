import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { B, C } from "../typechain-types";

describe("Lesson 23: Delegatecall", function () {

  async function deployDelegatecallFixture() {
    const [owner] = await ethers.getSigners();

    const CFactory = await ethers.getContractFactory("contracts/23_Delegatecall.sol:C");
    const cContract: C = await CFactory.deploy();
    
    const BFactory = await ethers.getContractFactory("contracts/23_Delegatecall.sol:B");
    const bContract: B = await BFactory.deploy();

    return { bContract, cContract, owner };
  }

  describe("call vs delegatecall", function () {
    it("`call` should modify state of C, and msg.sender should be B", async function () {
      const { bContract, cContract } = await loadFixture(deployDelegatecallFixture);
      const cAddress = await cContract.getAddress();
      const bAddress = await bContract.getAddress();
      const newValue = 10;

      // Call C via B using `call`
      await bContract.callSetVars(cAddress, newValue);

      // Check state of C
      expect(await cContract.num()).to.equal(newValue);
      expect(await cContract.sender()).to.equal(bAddress);

      // Check state of B (should be unchanged)
      expect(await bContract.num()).to.equal(0);
      expect(await bContract.sender()).to.equal(ethers.ZeroAddress);
    });

    it("`delegatecall` should modify state of B, and msg.sender should be the user (owner)", async function () {
        const { bContract, cContract, owner } = await loadFixture(deployDelegatecallFixture);
        const cAddress = await cContract.getAddress();
        const newValue = 100;

        // Call C via B using `delegatecall`
        await bContract.delegatecallSetVars(cAddress, newValue);

        // Check state of B (should be changed)
        expect(await bContract.num()).to.equal(newValue);
        expect(await bContract.sender()).to.equal(owner.address);

        // Check state of C (should be unchanged)
        expect(await cContract.num()).to.equal(0);
        expect(await cContract.sender()).to.equal(ethers.ZeroAddress);
    });
  });
});
