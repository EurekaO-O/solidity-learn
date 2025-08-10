import { expect } from "chai";
import { ethers } from "hardhat";

describe("Event 合约",function(){
    let contractInstance: any;
    let owner: any;
    let otherAccount: any;


    // 部署
    beforeEach(async function () {
    // 分配两个账户
    [owner, otherAccount] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Event");
    contractInstance = await ContractFactory.deploy();
  });

    describe("部署", function () {
    it("应该给部署者分配 1000 个代币", async function () {
      const ownerBalance = await contractInstance.balances(owner.address);
      expect(ownerBalance).to.equal(1000);
    });
  });


  describe("转账", function(){
    it("应该能成功转账并触发 Transfer 事件", async function(){
        // 定义发送者from 和 接收者 to
        const initialOwnerBalance = await contractInstance.balances(owner.address);
        const initialOtherBalance = await contractInstance.balances(otherAccount.address);
        // 金额数量
        const amount = 100n;

        // 我们期望 transfer 调用会触发一个 Transfer 事件
        // 并验证事件的参数是否正确
        await expect(contractInstance.transfer(otherAccount.address, amount))
        .to.emit(contractInstance, "Transfer")
        .withArgs(owner.address, otherAccount.address, amount);

        // 验证转账后双方的余额是否正确
        const finalOwnerBalance = await contractInstance.balances(owner.address);
        const finalOtherBalance = await contractInstance.balances(otherAccount.address);

        expect(finalOwnerBalance).to.eq(initialOwnerBalance - amount);
        expect(finalOtherBalance).to.eq(initialOtherBalance + amount);
    });

    it("当余额不足时，交易应该失败", async function () {
      const initialOwnerBalance = await contractInstance.balances(owner.address);
      
      // 尝试转一个比自己余额还多的数额
      const amount = initialOwnerBalance + 1n;

      // 我们期望这个交易会失败，并返回我们合约中定义的错误信息
      await expect(
        contractInstance.transfer(otherAccount.address, amount)
      ).to.be.revertedWith("Insufficient balance");
        });
    });
});