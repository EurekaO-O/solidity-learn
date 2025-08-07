import { ethers } from "hardhat";
import { expect } from "chai";
import { FunctionTypes } from "../typechain-types";

/**
 * "import { FunctionTypes } from "../typechain-types";"报错
 * 为什么会报错？
这个错误 没有导出的成员“FunctionTypes” 的意思是，你的测试脚本想从 typechain-types 文件夹里导入一个叫做 FunctionTypes 的“类型定义”，但是它没找到。

这是因为我们虽然写了 contracts/03_Function.sol，但我们还没有编译它。

编译是这样一个过程：
1.Hardhat 读取你的 .sol 文件。
2.把它转换成以太坊虚拟机（EVM）能理解的字节码（Bytecode）和应用二进制接口（ABI）。
3.最关键的一步：Hardhat 会自动运行 TypeChain 工具，根据编译好的合约，在 typechain-types 文件夹里生成对应的 TypeScript 类型文件（比如 FunctionTypes.ts）。
 */

describe("FunctionTypes Contract",function(){
    let functionTypes: FunctionTypes;

    //在所有测试用例运行前，只执行一次
    before(async function(){
        //部署 FunctionTypes 合约
        const functionTypesFactory = await ethers.getContractFactory("FunctionTypes");
        //部署
        functionTypes = await functionTypesFactory.deploy();
        await functionTypes.waitForDeployment();
    });

    it("应该初始值为：5",async function(){
        // 验证初始状态
        expect(await functionTypes.number()).to.eq(5);
    })

    it("应该把初始值+1了", async function () {
        // 调用 add() 函数
        const tx = await functionTypes.add();
        await tx.wait();
        // 验证状态是否改变
        expect(await functionTypes.number()).to.equal(6);
    });

    it("应使用 addPure 返回数字 + 1, 而不改变状态", async function () {
        // 调用 pure 函数
        const result = await functionTypes.addPure(10);
        expect(result).to.equal(11);
        // 验证状态没有改变
        expect(await functionTypes.number()).to.equal(6); // 仍然是上一个测试改变后的 6
    });

    it("应该是使用 addView 返回数字+1 而不改变状态", async function () {
        // 调用 view 函数
        const result = await functionTypes.addView();
        expect(result).to.equal(7); // 6 + 1 = 7
        // 验证状态没有改变
        expect(await functionTypes.number()).to.equal(6);
    });

    it("应该-1：调用minuscall，其内部调用了minus函数(-1操作)类型为internal，外部不可见", async function () {
        // 调用 minusCall()
        const tx = await functionTypes.minusCall();
        await tx.wait();
        // 验证状态是否改变
        expect(await functionTypes.number()).to.equal(5);
    });

    it("应该获得 ETH 并，调用 minus 减去 1", async function () {
        const oneEther = ethers.parseEther("1.0");
        
        // 调用 payable 函数，并发送 1 ETH
        const tx = await functionTypes.minusPayable({ value: oneEther });
        await tx.wait();

        // 验证合约余额
        const contractAddress = await functionTypes.getAddress();
        const balance = await ethers.provider.getBalance(contractAddress);
        expect(balance).to.equal(oneEther);

        // 验证状态是否改变
        expect(await functionTypes.number()).to.equal(4);
    });
});