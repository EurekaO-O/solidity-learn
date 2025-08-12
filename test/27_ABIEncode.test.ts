import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ABIEncode } from "../typechain-types";

describe("Lesson 27: ABI Encode", function () {

  async function deployABIEncodeFixture() {
    const ABIEncodeFactory = await ethers.getContractFactory("ABIEncode");
    const abiEncode: ABIEncode = await ABIEncodeFactory.deploy();
    return { abiEncode };
  }

  describe("Encoding Functions", function () {
    it("Should correctly encode data with abi.encode", async function () {
      const { abiEncode } = await loadFixture(deployABIEncodeFixture);
      
      const x = 10;
      const addr = "0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71";
      const name = "0xAA";
      const array = [5, 6];

      // Get the encoded data from the contract
      const encodedDataFromContract = await abiEncode.encode();

      // Encode the same data on the client-side using Ethers.js
      const encodedDataFromClient = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256", "address", "string", "uint256[2]"],
        [x, addr, name, array]
      );

      // The results should be identical
      expect(encodedDataFromContract).to.equal(encodedDataFromClient);
    });

    it("Should correctly encode data with abi.encodePacked", async function () {
        const { abiEncode } = await loadFixture(deployABIEncodeFixture);
        
        const x = 10;
        const addr = "0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71";
        const name = "0xAA";
        const array = [5, 6];
  
        const encodedDataFromContract = await abiEncode.encodePacked();
  
        // ethers.solidityPacked is the client-side equivalent of abi.encodePacked
        const encodedDataFromClient = ethers.solidityPacked(
          ["uint256", "address", "string", "uint256[2]"],
          [x, addr, name, array]
        );
  
        expect(encodedDataFromContract).to.equal(encodedDataFromClient);
    });

    it("Should correctly decode data", async function () {
        const { abiEncode } = await loadFixture(deployABIEncodeFixture);
        
        const x = 10;
        const addr = "0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71";
        const name = "0xAA";
        const array = [5n, 6n]; // Use BigInts for array comparison

        // Get the standard encoded data
        const encodedData = await abiEncode.encode();

        // Decode it using the contract's function
        const [decodedX, decodedAddr, decodedName, decodedArray] = await abiEncode.decode(encodedData);

        // Verify the decoded values match the originals
        expect(decodedX).to.equal(x);
        expect(decodedAddr).to.equal(addr);
        expect(decodedName).to.equal(name);
        expect(decodedArray).to.deep.equal(array);
    });
  });
});
