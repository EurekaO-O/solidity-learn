import { ethers } from "hardhat";
import { expect } from "chai";

//测试套件
describe("HelloWeb3",function(){
    //测试用例  当测试运行时，这个描述会显示在终端里。
    it("正常输出字符串",async function(){

        //1. 定义合约工厂 用来创建或部署合约
        const HelloWeb3Factory = await ethers.getContractFactory("HelloWeb3");

        //2. 调用工厂的deploy方法会在 Hardhat 的本地测试网络上部署一个新的 HelloWeb3 合约实例
        const helloWeb3 = await HelloWeb3Factory.deploy();

        //3. 调用公开状态变量自动生成的getter _string()
        const result = await helloWeb3._string();
        //可以打印出结果
        console.log("输出结果为：",result);
        //并调用 expect 断言判断返回值是否为"Hello Web3!"
        expect(result).to.eq("Hello Web3!");
    });
});