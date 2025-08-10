// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Event{
    // 模拟 ERC20 代币的余额映射
    mapping(address => uint) public balances;

    /**
     * 声明一个 Transfer 事件，和ERC20标准兼容
     * `from` 和 `to` 被标记为 indexed，方便按地址进行搜索.
     * `value` 没有被标记，它将被存储在日志的 data 部分.
     */
    event Transfer(address indexed from,address indexed to,uint256 value);

    /**
     * 构造函数，给部署者一些初始代币用来测试
     */
    constructor(){
        balances[msg.sender] = 1000;
    }

    /**
     * 一个简化的转账函数
     * 更新两个地址的余额，然后触发 Transfer 事件
     */
    function transfer(address to,uint256 amount) public {
        // 检查发送者是否有足够的余额
        require(balances[msg.sender] >= amount,"Insufficient balance");

        // 更新余额
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // 触发 Transfer 事件，把交易详情记录到区块链日志里
        emit Transfer(msg.sender,to,amount);
    }
}