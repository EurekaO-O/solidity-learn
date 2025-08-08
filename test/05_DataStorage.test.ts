import { ethers } from "hardhat";
import { expect } from "chai";
import { DataStorage } from "../typechain-types";

describe("DataStorage Contract",function(){
    let dataStorage: DataStorage;

    // 注意：这里我们用beforeEach，确保每个测试用例都在一个全新的、干净的合约实例上运行
    // 对于验证状态改变很重要
    beforeEach(async function(){
        const dataStorageFactory = await ethers.getContractFactory("DataStorage");
        dataStorage = await dataStorageFactory.deploy();
    });

    it("应该展示存储参考行为", async function () {
        // 初始状态应该是 [1,2,3]
        expect(await dataStorage.arr(0)).to.eq(1);

        // 调用 fStorage() ，应该会修改状态变量 arr[0]
        await dataStorage.fStorage();

        // 验证状态变量 arr[0] 是否真的被修改为 100
        expect(await dataStorage.arr(0)).to.eq(100);
    });

    it("应该展示内存复制行为", async function () {
        // 初始状态 arr[1] 应该为 2
        expect(await dataStorage.arr(1)).to.eq(2);

        // 调用 fMemory()
        const result = await dataStorage.fMemory();

        // 验证 fMemory() 的返回值（内存中的拷贝副本）是否被修改
        expect(result[1]).to.eq(200);

        // 最后验证是否被修改
        expect(await dataStorage.arr(1)).to.eq(2);
    });

    it("应该展示调用数据行为", async function () {
        const inputArray = [10, 20, 30];
        // 调用 fCalldata()，它应该原封不动地返回我们传入的数组
        const result = await dataStorage.fCalldata(inputArray);
        
        // 验证返回值是否和输入值完全一样 同样的对于数组或复杂对象用deep.eq
        expect(result).to.deep.eq(inputArray.map(n => BigInt(n)));
    });

    it("应该正确返回全局变量", async function () {
        // 获取一个测试账户作为调用者
        const [signer] = await ethers.getSigners();

        // 调用getGlobalVars*()
        const [sender,blockNum,data] = await dataStorage.getGlobalVars();

        // 验证 msg.sender 是否为调用者地址
        expect(sender).to.eq(signer.address);

        // 验证 block.number 是否大于 0
        // 我们不能精确知道是几，但它肯定是一个正数
        expect(blockNum).to.be.gt(0); 

        // data 字段会比较复杂，我们只验证它不是空的
        expect(data).to.not.be.empty;
    });
});