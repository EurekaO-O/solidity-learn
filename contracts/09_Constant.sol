// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ConstantAndImmutable
 * @dev 演示 constant 和 immutable 关键字的用法和区别.
*/
contract Constant{
    // --- Constant 变量 ---
    // 必须在声明时初始化，且命名通常为全大写
    uint256 public constant MAX_SUPPLY = 10000;
    address public constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;

    // --- Immutable 变量 ---
    // 可以在声明时初始化    timestamp：指包含这笔交易的那个区块被矿工（或 PoS 中的验证者）成功打包时，由该矿工记录的时间戳。
    uint256 public immutable TOKEN_CREATION_TIMESTAMP = block.timestamp;

    // 也可以只声明 然后再构造函数中初始化
    address public immutable owner;
    uint256 public immutable randomNumber;

    /**
     * @dev 构造函数在合约部署时执行一次，是初始化 immutable 变量的唯一机会
    */
   constructor(uint256 _initialRandomNumber){
    // 初始化在声明时未赋值的 immutable 变量
    owner = msg.sender;
    randomNumber = _initialRandomNumber;
   }
}