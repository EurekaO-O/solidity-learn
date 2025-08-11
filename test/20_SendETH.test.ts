import { ethers } from "hardhat";
import { expect } from "chai";
import { SendETH, ReceiveETH } from "../typechain-types";
import { Signer } from "ethers";

describe("SendETH Contract", function () {
    let sendContract: SendETH;
    let receiveContract: ReceiveETH;
    let owner: Signer;
    let receiveContractAddress: string;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();

        // Deploy the ReceiveETH contract first
        const receiveFactory = await ethers.getContractFactory("ReceiveETH");
        receiveContract = await receiveFactory.deploy();
        receiveContractAddress = await receiveContract.getAddress();

        // Deploy the SendETH contract and send 10 ETH to it
        const sendFactory = await ethers.getContractFactory("SendETH");
        sendContract = await sendFactory.deploy({ value: ethers.parseEther("10.0") });
    });

    it("should transfer ETH successfully using transfer()", async function () {
        const amount = ethers.parseEther("1.0");
        
        // Check balance before
        expect(await receiveContract.getBalance()).to.equal(0);

        // Perform the transfer
        await sendContract.transferETH(receiveContractAddress, amount);

        // Check balance after
        expect(await receiveContract.getBalance()).to.equal(amount);
    });

    it("should transfer ETH successfully using send()", async function () {
        const amount = ethers.parseEther("1.0");
        await sendContract.sendETH(receiveContractAddress, amount);
        expect(await receiveContract.getBalance()).to.equal(amount);
    });

    it("should transfer ETH successfully using call()", async function () {
        const amount = ethers.parseEther("1.0");
        await sendContract.callETH(receiveContractAddress, amount);
        expect(await receiveContract.getBalance()).to.equal(amount);
    });

    it("should fail to transfer if contract has insufficient funds", async function () {
        // Try to send 20 ETH, but the contract only has 10 ETH
        const amount = ethers.parseEther("20.0");

        // We expect the transaction to be reverted
        await expect(
            sendContract.transferETH(receiveContractAddress, amount)
        ).to.be.reverted;
    });
});
