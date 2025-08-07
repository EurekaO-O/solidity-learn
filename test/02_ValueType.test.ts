import { expect } from "chai"
import hre from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"; // 用 loadFixture 来部署，更高效
import ValueTypeModule from "../ignition/modules/02_DeployValueType"

describe("ValueType Contract Tests",function (){
    //1. 定义一个 Fixture 函数。用来处理部署的内容以及返回需要被测试的合约对象
    async function deployValueTypeFixture(){
        const {valueType} = await hre.ignition.deploy(ValueTypeModule);
        return {valueType};
    }

    //2. 在测试用例，用 loadFixture 加载 fixture
    it("测试成功", async function(){
        const {valueType} = await loadFixture(deployValueTypeFixture);


        console.log("ValueType 合约已部署到地址:", await valueType.getAddress());
        console.log("=".repeat(40)); //分割线
 
        const number2 = await valueType._number2();
        console.log("从合约读取到 _number2 的值是:", number2.toString());
 
        const numberbool = await valueType._numberbool();
        console.log("从合约读取到 _numberbool 的值是:", numberbool);
 
        const action = await valueType.action();
        console.log("从合约读取到 action 的值是:", action.toString(), "(0 代表 Buy)");
 
        console.log("=".repeat(40));//分割线
        

        expect(number2).to.eq(4);
        expect(numberbool).to.be.true;
        expect(action).to.eq(0);

        //调用函数
        expect(await valueType.enumToUint()).to.eq(0);
    });
});