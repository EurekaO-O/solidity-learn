import { expect } from "chai";
import { ethers } from "hardhat";

describe("Ownable 合约", function () {
  let contractInstance: any;
  let owner: any;
  let otherAccount: any;

  beforeEach(async function () {
    [owner, otherAccount] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Modifier");
    contractInstance = await ContractFactory.deploy();
  });

  describe("部署", function () {
    it("应该将 owner 设置为部署者", async function () {
      expect(await contractInstance.owner()).to.equal(owner.address);
    });

    it("应该在部署时触发 OwnershipTransferred 事件", async function () {
      // Hardhat/Ethers v6 的 `deployTransaction` 可能在新版本中被 `deploymentTransaction()` 替代
      const deployTx = contractInstance.deploymentTransaction();
      await expect(deployTx)
        .to.emit(contractInstance, "OwnershipTransferred")
        .withArgs(ethers.ZeroAddress, owner.address);
    });
  });

  describe("所有权转移", function () {
    it("owner 应该可以成功转移所有权", async function () {
      // 调用 transferOwnership 函数，并期望它触发一个事件
      await expect(contractInstance.transferOwnership(otherAccount.address))
        .to.emit(contractInstance, "OwnershipTransferred")
        .withArgs(owner.address, otherAccount.address);

      // 验证新的 owner 是否已更新
      expect(await contractInstance.owner()).to.equal(otherAccount.address);
    });

    it("非 owner 用户应该无法转移所有权", async function () {
      // 我们期望这个交易会失败，并返回我们合约中定义的错误信息
      await expect(
        contractInstance.connect(otherAccount).transferOwnership(otherAccount.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("应该阻止将所有权转移给零地址", async function () {
      await expect(
        contractInstance.transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("Ownable: new owner is the zero address");
    });
  });
});
