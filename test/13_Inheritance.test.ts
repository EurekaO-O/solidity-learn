// 导入测试所需的库
import { expect } from "chai"; 
import { ethers } from "hardhat"; 
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"; // Hardhat 提供的测试辅助函数

describe("继承 (Inheritance)", function () {
  
  // 我们定义一个 `fixture` 函数。
  // Fixture 是一种测试模式，它会部署所有合约并设置好初始状态。
  // `loadFixture` 会在第一次调用时运行这个函数，并快照区块链状态。
  // 后续的测试用例如果也调用 `loadFixture`，它会直接从快照恢复，而不是重新部署，从而极大地提高了测试速度。
  async function deployInheritanceFixture() {
    // 获取可用的钱包账户，通常第一个是部署者
    const [owner] = await ethers.getSigners();

    // 获取 "Yeye" 合约的工厂实例
    const Yeye = await ethers.getContractFactory("Yeye");
    // 部署 "Yeye" 合约
    const yeye = await Yeye.deploy();

    // 获取 "Baba" 合约的工厂实例
    const Baba = await ethers.getContractFactory("Baba");
    // 部署 "Baba" 合约
    const baba = await Baba.deploy();

    // 获取 "Erzi" 合约的工厂实例
    const Erzi = await ethers.getContractFactory("Erzi");
    // 部署 "Erzi" 合约
    const erzi = await Erzi.deploy();

    // 返回所有部署好的合约实例和账户，方便在测试用例中使用
    return { yeye, baba, erzi, owner };
  }

  // 针对 Yeye 合约的测试子集
  describe("Yeye (爷爷) 合约", function () {
    // `it` 定义一个具体的测试用例
    it("应该能正确发出 'Yeye' 日志", async function () {
      // 使用 fixture 加载部署好的合约
      const { yeye } = await loadFixture(deployInheritanceFixture);
      
      // 断言：期望调用 yeye.hip() 这个交易会触发一个名为 "Log" 的事件，
      // 并且事件的参数是 "Yeye"
      await expect(yeye.hip()).to.emit(yeye, "Log").withArgs("Yeye");
      await expect(yeye.pop()).to.emit(yeye, "Log").withArgs("Yeye");
      await expect(yeye.yeye()).to.emit(yeye, "Log").withArgs("Yeye");
    });
  });

  // 针对 Baba 合约的测试子集
  describe("Baba (爸爸) 合约 - 简单继承", function () {
    it("重写的函数应该发出 'Baba' 日志", async function () {
      const { baba } = await loadFixture(deployInheritanceFixture);
      // 验证被重写的 hip() 和 pop() 函数的行为是否符合预期
      await expect(baba.hip()).to.emit(baba, "Log").withArgs("Baba");
      await expect(baba.pop()).to.emit(baba, "Log").withArgs("Baba");
    });

    it("自己的函数应该发出 'Baba' 日志", async function () {
      const { baba } = await loadFixture(deployInheritanceFixture);
      // 验证自己的 baba() 函数
      await expect(baba.baba()).to.emit(baba, "Log").withArgs("Baba");
    });

    it("继承的未重写函数应该发出 'Yeye' 日志", async function () {
      const { baba } = await loadFixture(deployInheritanceFixture);
      // 验证继承自 Yeye 的 yeye() 函数，其行为应该和父合约保持一致
      await expect(baba.yeye()).to.emit(baba, "Log").withArgs("Yeye");
    });
  });

  // 针对 Erzi 合约的测试子集
  describe("Erzi (儿子) 合约 - 多重继承", function () {
    it("重写的函数应该发出 'Erzi' 日志", async function () {
      const { erzi } = await loadFixture(deployInheritanceFixture);
      // 验证在多重继承后，重写的函数是否符合预期
      await expect(erzi.hip()).to.emit(erzi, "Log").withArgs("Erzi");
      await expect(erzi.pop()).to.emit(erzi, "Log").withArgs("Erzi");
    });

    it("应该正确继承来自 Baba 的函数", async function () {
      const { erzi } = await loadFixture(deployInheritanceFixture);
      // 验证是否正确继承了 Baba 合约独有的函数
      await expect(erzi.baba()).to.emit(erzi, "Log").withArgs("Baba");
    });

    it("应该正确继承来自 Yeye 的函数", async function () {
      const { erzi } = await loadFixture(deployInheritanceFixture);
      // 验证是否正确继承了 Yeye 合约独有的函数
      await expect(erzi.yeye()).to.emit(erzi, "Log").withArgs("Yeye");
    });
  });
});
