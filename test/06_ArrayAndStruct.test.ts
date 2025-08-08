import { ethers } from "hardhat";
import { expect } from "chai";
import { ArrayAndStruct } from "../typechain-types";

describe("ArrayAndStruct Contract", function(){
    let contract: ArrayAndStruct;

    beforeEach(async function () {
        const factory = await ethers.getContractFactory("ArrayAndStruct");
        contract = await factory.deploy();
    });

    describe("Array Tests", function () {
        it("应正确处理数组操作", async function () {
            // 初始数组为空
            let arr = await contract.getArr();
            expect(arr.length).to.equal(0);

            // 调用 arrayOperations() -> push(1), push(2), pop()
            await contract.arrayOperations();
            
            // 验证最终的数组
            arr = await contract.getArr();
            expect(arr.length).to.equal(1);
            expect(arr[0]).to.equal(1);
        });

        it("应该正确创建内存数组", async function () {
            const memoryArr = await contract.createMemoryArray(5);
            expect(memoryArr.length).to.equal(5);
            expect(memoryArr[0]).to.equal(100);
        });
    });

    describe("Struct Tests", function () {
        it("Should initialize student with initStudent1", async function () {
            await contract.initStudent1();
            const student = await contract.student();
            expect(student.id).to.equal(11);
            expect(student.score).to.equal(100);
        });

        it("Should initialize student with initStudent2", async function () {
            await contract.initStudent2();
            const student = await contract.student();
            expect(student.id).to.equal(1);
            expect(student.score).to.equal(80);
        });

        it("Should initialize student with initStudent3", async function () {
            await contract.initStudent3();
            const student = await contract.student();
            expect(student.id).to.equal(3);
            expect(student.score).to.equal(90);
        });

        it("Should initialize student with initStudent4", async function () {
            await contract.initStudent4();
            const student = await contract.student();
            expect(student.id).to.equal(4);
            expect(student.score).to.equal(60);
        });
    });
});