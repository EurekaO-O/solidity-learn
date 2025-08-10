// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Overloading{
    // 案例1: 基础的函数重载
    // 两个函数同名，但一个无参数，一个有 string 参数
    function saySomething() public pure returns(string memory){
        return ("Nothing");
    }
    function saySomething(string memory something) public pure returns(string memory){
        return (something);
    }

    // 案例2: 会产生歧义的重载
    // 两个函数同名，但参数类型一个是 uint8，一个是 uint256
    function f(uint8 _in) public pure returns (uint8 out) {
        out = _in;
    }

    function f(uint256 _in) public pure returns (uint256 out) {
        out = _in;
    }
}