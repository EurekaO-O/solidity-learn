import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Hash } from "../typechain-types";

describe("Lesson 28: Hash", function () {

  async function deployHashFixture() {
    const HashFactory = await ethers.getContractFactory("contracts/28_Hash.sol:Hash");
    const hashContract: Hash = await HashFactory.deploy();
    return { hashContract };
  }

  describe("Hashing Functions", function () {
    it("Should produce the same hash as the client for multiple arguments", async function () {
      const { hashContract } = await loadFixture(deployHashFixture);
      
      const num = 123;
      const str = "WTF Academy";
      const addr = "0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71";

      // Get the hash from the smart contract
      const hashFromContract = await hashContract.hash(num, str, addr);

      // Calculate the same hash on the client-side using Ethers.js
      // ethers.solidityPackedKeccak256 is the equivalent of keccak256(abi.encodePacked(...))
      const hashFromClient = ethers.solidityPackedKeccak256(
        ["uint256", "string", "address"],
        [num, str, addr]
      );

      // The results must be identical
      expect(hashFromContract).to.equal(hashFromClient);
    });

    it("Should demonstrate sensitivity", async function () {
        const { hashContract } = await loadFixture(deployHashFixture);
        
        const str1 = "Hello";
        const str2 = "hello"; // Only one character is different

        const hash1 = await hashContract.hashString(str1);
        const hash2 = await hashContract.hashString(str2);

        // A small change in input should result in a completely different hash
        expect(hash1).to.not.equal(hash2);
    });
  });
});
