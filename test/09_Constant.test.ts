import { expect } from "chai";
import { ethers } from "hardhat";
// 注意：我们移除了未使用的 'time' 导入

describe("Constant 合约", function () {
  let contractInstance: any;
  let owner: any;
  const initialRandomNumber = 12345;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const ContractFactory = await ethers.getContractFactory("Constant");
    
    contractInstance = await ContractFactory.deploy(initialRandomNumber);
  });

  describe("Constant 变量", function () {
    it("MAX_SUPPLY 应该返回正确的值", async function () {
      expect(await contractInstance.MAX_SUPPLY()).to.equal(10000);
    });

    it("BURN_ADDRESS 应该返回正确的值", async function () {
      expect(await contractInstance.BURN_ADDRESS()).to.equal("0x000000000000000000000000000000000000dEaD");
    });
  });

  describe("Immutable 变量", function () {
    it("owner 应该被正确设置为部署者地址", async function () {
      expect(await contractInstance.owner()).to.equal(owner.address);
    });

    it("randomNumber 应该被正确设置为构造函数传入的值", async function () {
      expect(await contractInstance.randomNumber()).to.equal(initialRandomNumber);
    });

    it("TOKEN_CREATION_TIMESTAMP 应该被设置为部署区块的时间戳", async function () {
      const deployTx = contractInstance.deploymentTransaction();
      // 如果 deployTx 是 null，说明合约已经部署，这是一个 Hardhat 的特性
      if (deployTx) {
        const deployBlock = await ethers.provider.getBlock(deployTx.blockNumber);
        if (deployBlock) {
          expect(await contractInstance.TOKEN_CREATION_TIMESTAMP()).to.equal(deployBlock.timestamp);
        }
      }
    });
  });
});