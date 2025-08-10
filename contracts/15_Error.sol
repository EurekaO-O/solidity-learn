// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 步骤 1: 在合约外部定义自定义错误
// 这是一个无参数的错误
error TransferNotOwner();
// 这是一个带参数的错误，可以返回更多信息
error TransferNotOwnerWithSender(address sender);

contract ErrorContract {
    address public owner;
    mapping(uint256 => address) public _owners;

    constructor(){
        owner = msg.sender;
        _owners[1] = msg.sender;// 假设 tokenId 1 的所有者是部署者
    }

    // Gas 消耗对比结论： error < assert < require
    // 方法1: 使用 if + revert + 自定义 error
    // 这是目前最推荐、最省 Gas 的方式
    function transferOwner1(uint256 tokenId,address newOwner) public {
        if(_owners[tokenId] != msg.sender){
            // 抛出自定义错误，清晰且高效
            revert TransferNotOwner();
            // 或者抛出带参数的错误，方便调试
            // revert TransferNotOwnerWithSender(msg.sender);
        }
    }

    // 方法2: 使用 require
    // 这是过去最常用的方式，现在依然广泛使用
    function transferOwner2(uint256 tokenId, address newOwner) public {
        // 将检查条件和错误信息写在一行，非常直观
        require(_owners[tokenId] == msg.sender, "Transfer Not Owner");
        _owners[tokenId] = newOwner;
    }

    // 方法3: 使用 assert
    // 主要用于检查内部不变量，不推荐用于常规的输入验证
    function transferOwner3(uint256 tokenId, address newOwner) public {
        // 只提供检查条件，没有错误信息
        assert(_owners[tokenId] == msg.sender);
        _owners[tokenId] = newOwner;
    }
}