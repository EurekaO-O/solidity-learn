import { ethers } from "hardhat";
import { expect } from "chai";
import { Fallback } from "../typechain-types";
import { Signer } from "ethers";

describe("Fallback Contract", function () {
    let contract: Fallback;
    let owner: Signer;
    let user: Signer;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();
        const factory = await ethers.getContractFactory("FallBack");
        contract = await factory.deploy();
    });

    it("Should trigger the receive() function when sending ETH with empty data", async function () {
        const oneEther = ethers.parseEther("1.0");
        const contractAddress = await contract.getAddress();

        // We expect the transaction to emit the 'receivedCalled' event
        await expect(
            owner.sendTransaction({
                to: contractAddress,
                value: oneEther,
            })
        ).to.emit(contract, "receivedCalled")
         .withArgs(await owner.getAddress(), oneEther);
    });

    it("Should trigger the fallback() function when sending ETH with non-empty data", async function () {
        const oneEther = ethers.parseEther("1.0");
        const contractAddress = await contract.getAddress();

        // We expect the transaction to emit the 'fallbackCalled' event
        // The 'data' field makes msg.data non-empty
        await expect(
            owner.sendTransaction({
                to: contractAddress,
                value: oneEther,
                data: "0x1234", // Some random data
            })
        ).to.emit(contract, "fallbackCalled")
         .withArgs(await owner.getAddress(), oneEther, "0x1234");
    });

    it("Should trigger the fallback() function when calling a non-existent function", async function () {
        const contractAddress = await contract.getAddress();
        
        // This is a more advanced way to call a function that doesn't exist
        // We are not sending any ETH, so value is 0
        await expect(
            owner.sendTransaction({
                to: contractAddress,
                data: "0xdeadbeef", // A function signature that does not exist
            })
        ).to.emit(contract, "fallbackCalled")
         .withArgs(await owner.getAddress(), 0, "0xdeadbeef");
    });
});
