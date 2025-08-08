import { ethers } from "hardhat";
import { expect } from "chai";

describe("Mapping Contract",function (){

    // 当前作用域声明变量，方便后续所有测试访问
    let mappingContract: any;
    let owner: any;
    let otherAccount: any;

    // beforeEach 会在每个 it测试用例运行前执行
    this.beforeEach(async function() {
        // 获取可用的签名者 （账户）
        [owner,otherAccount] = await ethers.getSigners();

        // 获取要部署的合约工厂
        const MappingFactory = await ethers.getContractFactory("Mapping");

        // 使用 owner 账户部署合约
        mappingContract = await MappingFactory.deploy();
        // q 为什么是owner账户？
        // a ethers.getSigners() 获取账户列表 -> owner 
        // 成为默认账户 -> getContractFactory() 自动关联到 owner -> .deploy() 由 owner 发起调用 -> constructor 在链上执行 -> msg.sender 的值就是 owner 的地址。
    });
    // 测试用例 1: 检查 owner 是否可以成功更新消息
  it("应允许 owner 更新消息", async function () {
    const testId = 1;
    const testMessage = "Hello, Hardhat!";

    // 调用 updateMessage 函数
    // `wait()` 会等待交易被矿工打包
    await mappingContract.updateMessage(testId, testMessage);

    // 验证 mapping 中的消息是否已更新
    expect(await mappingContract.messages(testId)).to.eq(testMessage);

    // 验证 updateCount 是否已增加到 1
    expect(await mappingContract.updateCount()).to.eq(1);
  });

  // 测试用例 2: 检查非 owner 用户是否无法更新消息
  it("应该阻止 非 owner 更新消息", async function () {
    const testId = 2;
    const testMessage = "Malicious Message";

    // 我们期望这个交易会失败 (revert)
    // `connect(otherAccount)` 让 otherAccount 作为调用者
    // `revertedWith` 检查失败的原因是否是我们合约中 require 语句的错误信息
    await expect(
      mappingContract.connect(otherAccount).updateMessage(testId, testMessage)
    ).to.be.revertedWith("Only owner can update messages.");
  });

  // 测试用例 3: 检查部署时 owner 是否被正确设置
  it("应该将部署器设置为 owner ", async function () {
    // 验证合约的 owner 是否是部署它的账户地址
    expect(await mappingContract.owner()).to.eq(owner.address);
  });
});