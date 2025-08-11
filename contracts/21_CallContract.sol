// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title OtherContract
 * @dev This is the target contract that will be called by CallContract.
 */
contract OtherContract{
    uint256 private _x = 0;
    address public lastCaller;

    event Log(uint amount,uint gas);

    function getBalance() view public returns(uint){
        return address(this).balance;
    }

    function setX(uint256 x)external payable{
        _x = x;
        lastCaller = msg.sender;
        if(msg.value > 0){
            emit Log(msg.value,gasleft());
        }
    }

    function getX()external view returns(uint x){
        x = _x;
    }   
}

/**
 * @title CallContract
 * @dev This contract demonstrates various ways to call OtherContract.
 */
contract CallContract {
    // Pattern 1: Pass address and create instance inside the function
    function callSetX(address _otherContractAddress,uint256 x)external{
        OtherContract(_otherContractAddress).setX(x);
    }

    // Pattern 2: Pass contract type as argument (syntactic sugar for address)
    function callGetX(OtherContract _otherContractInstance) external view returns(uint x){
        x = _otherContractInstance.getX();
    }

    // Pattern 3: Call a payable function and send ETH
    function callSetXAndSendETH(address _otherContractAddress, uint256 x) payable external{
        // Forward the  ETH sent to this function to the target function
        OtherContract(_otherContractAddress).setX{value: msg.value}(x);
    }

}