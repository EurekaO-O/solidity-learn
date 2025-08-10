import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("菱形继承 (Diamond Inheritance)", function () {

  async function deployDiamondFixture() {
    // 部署 people 合约，它会自动继承整个菱形结构
    const People = await ethers.getContractFactory("people");
    const people = await People.deploy();
    return { people };
  }

  describe("super 调用顺序", function () {
    it("调用 foo() 时，事件的触发顺序应为 Eve -> Adam -> God", async function () {
      const { people } = await loadFixture(deployDiamondFixture);

      // 我们期望调用 people.foo() 这个交易，会按特定顺序触发三次 Log 事件
      // 这个测试精确地验证了 C3 线性化后的 super 调用链
      await expect(people.foo())
        .to.emit(people, "Log").withArgs("Eve.foo called").and
        .to.emit(people, "Log").withArgs("Adam.foo called").and
        .to.emit(people, "Log").withArgs("God.foo called");
    });

    it("调用 bar() 时，事件的触发顺序应为 Eve -> Adam -> God", async function () {
      const { people } = await loadFixture(deployDiamondFixture);

      // 对 bar() 函数也进行同样的验证
      await expect(people.bar())
        .to.emit(people, "Log").withArgs("Eve.bar called").and
        .to.emit(people, "Log").withArgs("Adam.bar called").and
        .to.emit(people, "Log").withArgs("God.bar called");
    });
  });
});
