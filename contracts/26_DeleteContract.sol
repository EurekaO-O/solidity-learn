// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

// This contract demoenstrates the modern bahavior of selfdestruct.
contract DeleteContract is Ownable{
    uint public value = 10;

    // Allow the contract to receive ETH upon deployment
    constructor() payable Ownable(msg.sender){}

    // Allow the contract to receive ETH via direct transfers
    receive() external payable{}

    // Only the owner can call this function
    function destroy() external onlyOwner{
        // This will transfer all ETH to the owner.
        // After the Cancun upgrade, it will NOT delete the contract code/storage.
        selfdestruct(payable(owner()));
    }

    function getBalance() external view returns(uint balance){
        balance = address(this).balance;
    }
}

// This contract demonstrates the original "delete" bahavior of selfdestruct
contract DeployAndDestroy is Ownable{
    constructor() Ownable(msg.sender){}

    // This function creates and destroys a DeleteContract in the same transation
    // 如果在同一笔交易中创建了又销毁，evm是允许删除合约的
    function createAndDestroy() public onlyOwner returns(address createdAddress){
        // Create a new DeleteContract instance
        DeleteContract newContract = new DeleteContract();
        createdAddress = address(newContract);

        // Immediately call its destroy function
        // 立即销毁
        newContract.destroy();
    }
}
