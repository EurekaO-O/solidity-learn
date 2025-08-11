// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Contract C: The logic contract with the function to be executed.
contract C{
    uint public num;
    address public sender;
    
    function setVars(uint _num) public payable{
        num = _num;
        sender = msg.sender;
    }
}

// Contract B: The calling contract with the storage.
contract B {
    // B must have the same storage layout as C.
    uint public num;
    address public sender;

    // This function calls C using `call`.
    // It will change the state of C.
    function callSetVars(address _cAddress, uint _num) external {
        (bool success, ) = _cAddress.call(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
        require(success);
    }

    // This function calls C using `delegatecall`.
    // It will change the state of B.
    function delegatecallSetVars(address _cAddress, uint _num) external {
        (bool success, ) = _cAddress.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
        require(success);
    }
}