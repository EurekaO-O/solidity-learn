// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Modifier{
    address public owner;

    /**
     * 定义一个事件，在所有权转移时触发
     */
    event OwnershipTransferred(address indexed previousOwner,address indexed newOwner);

    /**
     * 构造函数，将owner设置为部署该合约的账户
     */
    constructor(){
         owner = msg.sender;
         emit OwnershipTransferred(address(0),msg.sender);
    }

    /**
     * 定义一个修饰器，限制函数只能由owner调用
     */
    modifier onlyOwner {
        require(msg.sender == owner,"Ownable: caller is not the owner");
        _;
        //遇到 _; 时，暂停 modifier，去执行被修饰的那个函数的函数体。
        //这里指的是transferOwnership函数
    }

    /**
     * 允许当前owner将合约的控制权转移给一个新的地址 newOwner
     */
    function transferOwnership(address newOwner) public virtual onlyOwner{
        require(newOwner != address(0),"Ownable: new owner is the zero address");
        emit OwnershipTransferred(owner,newOwner);
        owner = newOwner;
    }
}