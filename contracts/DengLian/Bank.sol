// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title 编写一个Bank合约（代码提交到github):
·通过Metamask向Bank合约存款（转账ETH)
·在Bank合约记录每个地址存款金额
·用数组记录存款金额前3名
·编写Bank合约withdraw(),实现只有管理员提取出所有的ETH
 * @author 
 * @notice 
 */
// 1. 定义Bank合约
contract Bank{
    // 2. 初始化管理员地址
    address public immutable owner;

    // 创建mapping记录地址以及对应余额
    mapping(address => uint) public balances;
    // 构造函数，当合约部署自动执行一次
    constructor(){
        // msg.sender 就是部署该合约的账户地址
        owner = msg.sender;
    }

    // 存款函数
    function desposit() external payable{
        // 更新调用者余额
        balances[msg.sender] += msg.value;
    }
}