// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DataStorage{
    // 状态变量 
    // 默认为storage类型，永久存储在链上(消费gas较多)
    uint[] public arr = [1,2,3];
    uint public x = 1;

    // 1. storage 引用
    // 函数内的 storage 变量指向状态变量的“指针”or“引用”
    function fStorage() public {
        // xStorage 是一个指向状态变量的 arr 的引用
        uint[] storage xStorage = arr;
        // 修改 xStorage 会直接修改状态变量 arr
        xStorage[0] = 100;
    }

    // 2. memory 拷贝
    // memory 变量是状态变量的一个独立副本
    function fMemory() public view returns(uint[] memory){
        // xMemory是arr的一个完整拷贝，存在内存中
        uint[] memory xMemory = arr;
        // 修改 xMemory 不会影响状态变量 arr
        xMemory[1] = 200;
        return xMemory;
    }

    // 3. calldata 只读外部函数参数
    function fCalldata(uint[] calldata _x) public pure returns(uint[] calldata){
        // _x[0] = 0; //这行会报错，因为 calldata 变量不能修改
        return (_x);
    }

    // 4. 全局变量示例
    function getGlobalVars() external view returns(address,uint,bytes memory){
        address sender = msg.sender;
        uint blockNum = block.number;
        bytes memory data = msg.data;
        return(sender,blockNum,data);
    }
}