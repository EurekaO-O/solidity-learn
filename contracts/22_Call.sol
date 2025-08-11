// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OtherContractV2{
    uint256 private _x = 0;
    address public lastCaller;
    uint public valueReceived;

    event Log(uint amount,uint gas);

    // A fallback function is needed to handle calls to non-existent functions
    fallback()external payable{
        emit Log(msg.value,gasleft());
    }

    function getBalance() view public returns(uint){
        return address(this).balance;
    }

    function setX(uint256 x)external payable{
        _x = x;
        lastCaller = msg.sender;
        valueReceived = msg.value;
        if(msg.value > 0){
            emit Log(msg.value,gasleft());
        }
    }
    function getX() external view returns(uint x){
        x = _x;
    }
}

// This contract will use the low-level 'call'
contract Call{
    event Response(bool success,bytes data);

    // Calls setX(uint256) on another contract
    function callSetX(address _addr,uint256 x)public payable{
        // Encode the function signature and arguments
        bytes memory calldataPayload = abi.encodeWithSignature("setX(uint256)",x);

        // Use .call to excute the function
        (bool success, bytes memory data) = _addr.call{value: msg.value}(calldataPayload);

        emit Response(success,data);
    }

    // Calls getX() on another contract and decodes the return value.
    function callGetX(address _addr) external returns(uint256) {
        bytes memory calldataPayload = abi.encodeWithSignature("getX()");
        (bool success, bytes memory data) = _addr.call(calldataPayload);
        
        require(success, "call to getX failed");

        // Decode the returned bytes data into a uint256.
        return abi.decode(data, (uint256));
    }

    // Calls a function that does not exist to trigger the fallback.
    function callNonExistent(address _addr) public {
        bytes memory calldataPayload = abi.encodeWithSignature("nonExistentFunction()");
        (bool success, bytes memory data) = _addr.call(calldataPayload);
        emit Response(success, data);
    }
}