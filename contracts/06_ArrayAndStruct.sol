// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ArrayAndStruct{
    // --- 数组 (Array) ---

    // 状态变量中的动态数组
    uint[] public arr;

    // 1. 数组的成员函数：push pop
    function arrayOperations() public {
        arr.push(1); // arr 变为 [1]
        arr.push(2); // arr 变为 [1, 2]
        arr.pop();   // arr 变为 [1]
    }

    // 2. 在内存中创建数组
    function createMemoryArray(uint _length) public pure returns(uint[] memory){
        uint[] memory memoryArr = new uint[](_length);
        memoryArr[0] = 100;
        return memoryArr;
    }
    
    // 3. getter 在测试中返回整个状态数组
    function getArr() public view returns(uint[] memory){
        return arr;
    }

    // --- 结构体 (Struct) ---

    // 1. 定义一个结构体
    struct Student{
        uint256 id;
        uint256 score;
    }

    // 2. 声明一个结构体类型的状态变量
    Student public student;

    // 3. 四种给结构体赋值的方式
    function initStudent1() external{
        Student storage _student = student;
        _student.id = 11;
        _student.score = 100;
    }

    function initStudent2() external {
        student.id = 1;
        student.score = 80;
    }

    function initStudent3() external {
        student = Student(3,90);
    }

    function initStudent4() external {
        student = Student({id: 4,score: 60});
    }
}