// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// `abstract contract` 意味着这个合约本身不能被部署。
// 它通常被用作其他合约的基础模板或父合约。
// 在这里，因为它没有实现所有功能（它只是一个基类），所以标记为 abstract。
abstract contract A{
    uint public a;

    // 父合约的构造函数，需要一个 uint 类型的参数
    constructor(uint _a){
        a = _a;
    }
}

// 方法1：在继承声明时，直接传递父构造函数的参数。
// 这里我们硬编码了 `1` 作为参数传递给 A 的构造函数。
contract B is A(1) {
    // B 合约本身不需要构造函数。
    // 部署 B 时，它的状态变量 a 会被自动设置为 1。
}

// 方法2：在子合约的构造函数中，通过 `modifier-like` 的语法调用父构造函数。
contract C is A {
    // C 合约的构造函数接收一个参数 `_c`
    // 然后它调用父合约 A 的构造函数，并传入 `_c * _c` 作为参数。
    constructor(uint _c) A(_c * _c) {
        // C 的构造函数体可以是空的
    }
    // 部署 C 时如果传入 5，那么状态变量 a 会被设置为 25。
}