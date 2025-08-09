import { expect } from "chai";
import { ethers } from "hardhat";

describe("InitialValue 合约", function () {
  let initialValueContract: any;

  // 在每个测试用例运行前，部署一个新的合约实例
  beforeEach(async function () {
    const InitialValueFactory = await ethers.getContractFactory("InitialValue");
    initialValueContract = await InitialValueFactory.deploy();
  });

  describe("值类型", function () {
    it("布尔类型的初始值应为 false", async function () {
      expect(await initialValueContract._bool()).to.eq(false);
    });

    it("字符串类型的初始值应为空字符串", async function () {
      expect(await initialValueContract._string()).to.eq("");
    });

    it("有符号整型的初始值应为 0", async function () {
      expect(await initialValueContract._int()).to.eq(0);
    });

    it("无符号整型的初始值应为 0", async function () {
      expect(await initialValueContract._uint()).to.eq(0);
    });

    it("地址类型的初始值应为零地址", async function () {
      expect(await initialValueContract._address()).to.eq(ethers.ZeroAddress);
    });

    it("枚举类型的初始值应为第一个成员 (索引 0)", async function () {
      // 枚举 'Buy' 位于索引 0
      expect(await initialValueContract._enum()).to.eq(0);
    });
  });

  describe("引用类型", function () {
    it("静态数组的初始值应为全零数组", async function () {
      // 修改: 调用新的 getter 函数
      const staticArray = await initialValueContract.getStaticArray();
      const expectedArray = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
      expect(staticArray).to.deep.eq(expectedArray);
    });

    it("动态数组的初始值应为空数组", async function () {
      // 修改: 调用新的 getter 函数
      const dynamicArray = await initialValueContract.getDynamicArray();
      expect(dynamicArray.length).to.eq(0);
    });

    it("映射的初始值应返回对应类型的零值", async function () {
      // 我们检查映射中的一个随机键，它应该返回地址类型的零值
      expect(await initialValueContract._mapping(123)).to.eq(ethers.ZeroAddress);
    });

    it("结构体的初始值应为所有成员都是零值的结构体", async function () {
      const s = await initialValueContract.student();
      expect(s.id).to.eq(0);
      expect(s.score).to.eq(0);
    });
  });

  describe("delete 操作符", function () {
    it("delete 操作后，布尔值应被重置为初始值", async function () {
      // 1. 检查 delete 前的值
      expect(await initialValueContract.boolToDelete()).to.eq(true);

      // 2. 调用 delete 函数
      await initialValueContract.deleteBool();

      // 3. 检查 delete 后的值
      expect(await initialValueContract.boolToDelete()).to.eq(false);
    });
  });
});