// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FallBack{
    // Event to be emitted when revive() is called
    event receivedCalled(address Sender,uint Value);

    // Event to be emitted when fallback() is called
    event fallbackCalled(address Sender,uint Value,bytes Data);

    // receive() is called when the contract receives ETH with empty msg.data
    receive() external payable{
        emit receivedCalled(msg.sender,msg.value);
    }

    // fallback() is called when:
    // 1.msg.data is not empty,but no function matches the signature
    // 2.msg.data is empty AND no receive() function exists;
    fallback() external payable{
        emit fallbackCalled(msg.sender,msg.value,msg.data);
    }
}