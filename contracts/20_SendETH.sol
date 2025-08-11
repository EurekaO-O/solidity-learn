// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Custom errors for failed transfers
error SendFailed();
error CallFailed();

// Contract that demonstrates 3 way to send ETH
contract SendETH{
    // Constructor to receive ETH during deployment
    constructor() payable{}

    // receive() function to receive ETH after deployment
    receive() external payable{}

    // Method 1: transfer() 2300 gas ,reverts on failure
    function transferETH(address payable _to,uint256 amount) external{
        _to.transfer(amount);
    }

    // Method 2: send() 2300 gas, returns bool ,DOES NOT revert
    function sendETH(address payable _to,uint256 amount) external{
        bool success = _to.send(amount);
        if (!success){
            revert SendFailed();
        }
    }

    // Method 3: call() forwards all gas, returns (bool,data),DOES NOT revert
    function callETH(address payable _to,uint256 amount) external {
        (bool success, ) = _to.call{value: amount}("");
        if(!success){
            revert CallFailed();
        }
    }
}

// A simple contract to receive ETH for testing purposes
contract ReceiveETH{
    // Event to log received amount and remaining gas
    event Log(uint amount,uint gas);

    // receive() function ,triggered when ETH is received
    receive() external payable{
        emit Log(msg.value,gasleft());
    }

    // Returns the contract's current ETH balance
    function getBalance() view public returns(uint){
        return address(this).balance;
    }
}