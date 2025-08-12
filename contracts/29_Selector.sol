// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "hardhat/console.sol";

contract Selector{
    event Log(bytes data);
    event LogBytes4(bytes4 selector);

    // A simple function to be called
    function mint(address to, uint256 amount) external {
        console.log("Mint function called with:");
        console.log("to:", to);
        console.log("amount:", amount);
    }

    //Returns the full calldata for a function call.
    function getMsgData(address to, uint256 amount) external {
        // Emit the entire msg.data
        emit Log(msg.data);
    }

    function getSelectorManual() external pure returns (bytes4) {
        // Manually calculate the selector from the function signature string
        // 从函数签名字符串手动计算选择器
        return bytes4(keccak256("mint(address,uint256)"));
    }

    function getSelectorBuiltIn() external pure returns (bytes4) {
        // Use the built-in .selector member
        // 使用内置的 .selector 成员
        return this.mint.selector;
    }

    function callWithSelector(address to, uint256 amount) external returns (bool, bytes memory) {
        // 1. Get the selector
        bytes4 selector = this.mint.selector;
        
        // 2. Encode the calldata with the selector and arguments
        bytes memory calldataToCall = abi.encodeWithSelector(selector, to, amount);
        emit Log(calldataToCall); // You can see this matches the output of getMsgData

        // 3. Make the low-level call
        (bool success, bytes memory data) = address(this).call(calldataToCall);
        return (success, data);
    }
}