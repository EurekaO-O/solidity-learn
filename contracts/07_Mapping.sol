// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Mapping{
    // public 的状态变量会自动生成一个 getter 函数
    // 所有人都可以调用 owner() 来查看合约所有者的地址
    address public owner;

    // mapping(uint => string) 定义了一个从 uint 类型到 string 类型的映射
    // public 关键字同样会为它生成一个 getter 函数：messages(uint _id)
    mapping(uint => string) public messages;

    // 一个简单的计数器
    uint public updateCount;

    // 构造函数 在合约部署时 仅执行一次
    // 比如这里用来初始化 owner
    constructor(){
        owner = msg.sender;
    }

    /**
     * @dev 更新消息. 只有 owner 可以调用.
     * @param _id 要更新的消息的 ID.
     * @param _message 新的消息内容.
    */
    function updateMessage(uint _id,string calldata _message) public {
        // 使用 require 检查调用者是否是 owner
        // 如果条件不为真，交易将回滚，并返回错误信息
        require(msg.sender == owner,"Only owner can update messages.");

        // 报错：ParserError: Invalid character in string. If you are trying to use Unicode characters, use a unicode"..." string literal.
        // 原因：ASCII 字符串：每个字符占用 1 个字节，存储和处理起来非常便宜。
        // Unicode 字符串（如中文、emoji）：通常使用 UTF-8 编码，每个字符可能会占用 1 到 4 个字节。在寸土寸金的以太坊上，这意味着存储一个中文字符串的成本可能会是同等长度英文字符串的 3 倍！
        // 行业标准做法是：链上使用错误码，链下处理错误信息。
        // 然后，在你的前端应用（例如网站的 JavaScript 代码）中，捕获这个错误并显示对应的中文信息：
        // <JAVASCRIPT>
        // // 前端代码
        // try {
        //     await contract.updateMessage("新的消息");
        // } catch (error) {
        //     // 捕获到链上返回的错误信息
        //     if (error.message.includes("NOT_OWNER")) {
        //         // 在网页上显示中文提示
        //         alert("抱歉，只有合约的所有者才能更新消息。");
        //     }
        // }
        
        // 更新 mapping 中的值
        messages[_id] = _message;

        // 更新次数+1
        updateCount++;
    }
}