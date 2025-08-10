// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Base 是一个抽象合约，因为有个未实现的函数 getAlias()
abstract contract Base{

    // 抽象合约可以有状态变量 
    string public name = "Base";
    
    // 这是一个未实现的函数，必须标记为 virtual
    function getAlias() public pure virtual returns(string memory);
}

// BaseImpl 是一个具体合约，它继承了 Base
contract BaseImpl is Base{
    // 必须实现父合约中所有未实现的函数
    function getAlias() public pure override returns(string memory){
        return "BaseImpl";
    }
}