// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Base 是一个接口，它只定义函数签名
interface Base {
    function getFirstName() external pure returns(string memory);
    function getLastName() external pure returns(string memory);
}

// BaseImpl 是一个具体合约，它实现了 Base 接口
contract BaseImpl is Base {
    // 必须实现接口中定义的所有函数
    function getFirstName() external pure override returns(string memory){
        return "Amazing";
    }
    
    function getLastName() external pure override returns(string memory){
        return  "Ang";
    }
}
// 关于interface和abstract的一些细节区别
//特性	        interface (接口)	        abstract contract (抽象合约)
//设计目的	    为外部定义交互标准 (API)	    为内部（子合约）提供代码模板
//函数可见性	必须是 external	            可以是 public 或 internal
//根本原因	    只关心外部调用，不关心内部实现	既关心外部调用，也关心内部和子合约的调用