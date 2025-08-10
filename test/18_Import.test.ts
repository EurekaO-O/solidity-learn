import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Import, OtherContract } from "../typechain-types";

describe("导入 (Import)", function () {

  async function deployImportFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Import = await ethers.getContractFactory("Import");
    const importContract: Import = await Import.deploy();

    return { importContract, owner, otherAccount };
  }

  describe("部署和功能", function () {
    it("Owner 应该被正确设置", async function () {
      const { importContract, owner } = await loadFixture(deployImportFixture);
      
      // 验证继承自 Ownable 的 owner() 函数是否返回部署者地址
      expect(await importContract.owner()).to.equal(owner.address);
    });

    it("内部部署的 OtherContract 初始值应为 0", async function () {
        const { importContract } = await loadFixture(deployImportFixture);
        
        // 验证 getOtherX() 返回的初始值
        expect(await importContract.getOtherX()).to.equal(0);
    });

    it("非 Owner 调用 setOtherX 应该失败", async function () {
        const { importContract, otherAccount } = await loadFixture(deployImportFixture);
        
        // 期望 otherAccount 调用 setOtherX 会因为 OwnableUnauthorizedAccount 错误而失败
        // 这是 OpenZeppelin Ownable 合约中定义的自定义错误
        await expect(
            importContract.connect(otherAccount).setOtherX(100)
        ).to.be.revertedWithCustomError(importContract, "OwnableUnauthorizedAccount");
    });

    it("Owner 调用 setOtherX 应该成功", async function () {
        const { importContract, owner } = await loadFixture(deployImportFixture);
        const newValue = 123;

        // Owner 调用 setOtherX
        await importContract.connect(owner).setOtherX(newValue);

        // 验证 getOtherX() 是否返回了新值
        expect(await importContract.getOtherX()).to.equal(newValue);
    });
  });
});
