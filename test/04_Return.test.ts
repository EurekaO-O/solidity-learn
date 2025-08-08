import { ethers } from "hardhat";
import { expect } from "chai";
import { Return } from "../typechain-types";

describe("Return Contract", function(){
    let returnContract: Return;

    before(async function(){
        //加载到factory
        const returnFactory = await ethers.getContractFactory("Return");
        //部署
        returnContract = await returnFactory.deploy();
        //await returnContract.waitForDeployment(); 
        // ethers.js v6版本不需要等待部署解析，在 await returnFactory.deploy;执行完毕后合约就已经部署完成
    });

    it("应该会返回多个值", async function () {
        const [num,bool,arr] = await returnContract.returnMultiple();

        expect(num).to.eq(1);
        expect(bool).to.be.true;
        //注意：比较数组或复杂对象时，要用 deep,eq
        expect(arr).to.deep.eq([1n,2n,5n]);
    });
    it("应正确返回命名值", async function () {
        const [num, bool, arr] = await returnContract.returnNamed();

        expect(num).to.equal(2);
        expect(bool).to.be.false;
        expect(arr).to.deep.equal([3n, 2n, 1n]);
    });

    it("应该使用显式返回语句处理命名返回", async function () {
        const [num, bool, arr] = await returnContract.returnNamed2();

        expect(num).to.equal(1);
        expect(bool).to.be.true;
        expect(arr).to.deep.equal([1n, 2n, 5n]);
    });

    it("应允许只获取某个值", async function () {
        // 在测试脚本中，可以直接验证解构
        // 直接调用函数，然后用数组索引来获取想要的返回值
        const result = await returnContract.returnNamed();
        const boolValue = result[1]; //比如获取第二个元素

        expect(boolValue).to.be.false;
    });
});