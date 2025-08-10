import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("接口 (Interface)", function () {

  async function deployInterfaceFixture() {
    // **这里是修改的关键**
    // 使用完全限定名称来精确指定我们要获取哪个 BaseImpl
    const fullyQualifiedName = "contracts/14_Interface/14_Interface.sol:BaseImpl";
    const BaseImpl = await ethers.getContractFactory(fullyQualifiedName);
    
    const baseImpl = await BaseImpl.deploy();
    return { baseImpl };
  }

  describe("BaseImpl 合约", function () {
    it("应该正确实现 getFirstName 函数", async function () {
      const { baseImpl } = await loadFixture(deployInterfaceFixture);
      
      expect(await baseImpl.getFirstName()).to.equal("Amazing");
    });

    it("应该正确实现 getLastName 函数", async function () {
      const { baseImpl } = await loadFixture(deployInterfaceFixture);
      
      expect(await baseImpl.getLastName()).to.equal("Ang");
    });
  });
});
