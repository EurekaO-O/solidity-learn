// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract FunctionTypes{
    // 定义一个公开的状态变量 number 初始值5
    uint256 public number = 5;

    // 这是一个会修改状态变量的函数
    // 既不是 pure 也不是 view
    function add() external{
        number = number + 1;
    }

    // pure 函数：不读取也不写入状态变量 
    // 它不访问合约的状态变量 number,所有计算都只依赖于传入的参数 _number。
    // 类似一个纯粹的计算工具
    function addPure(uint256 _number) external pure returns(uint256 new_number){
        new_number = _number + 1;
    }
    // view 函数：可以读取但不能写入状态变量
    // 类似只读查询工具
    function addView() external view returns(uint256 new_number){
        new_number = number + 1;
    }

    // internal 函数：只能在合约内部被调用
    // 你（或者任何其他用户）不能直接从外部调用 minus() 函数。它对外界是不可见的。
    function minus() internal{
        number = number - 1;
    }
    // external 函数：用来从外部简洁调用 internal 函数
    // 它被标记为 external，所以可以从外部调用。
    //它的函数体内只有一行代码：minus();。
    //这正是 internal 函数的用法：
    //  我们创建了一个外部可访问的“入口” (minusCall)
    //  由这个入口去调用那个内部的、不对外开放的 minus 函数。
    function minusCall() external {
        minus();
    /**
     * 这种模式非常常见
     * 比如:可以把一些核心的、敏感的逻辑放在 internal 函数里，
     * 然后用一个 public 或 external 的函数在调用核心逻辑之前
     * 先做一些权限检查（比如检查 msg.sender 是不是 owner）。
     * */
    }

    //payable 函数：在调用时可以接受ETH
    function minusPayable() external payable returns(uint256 balance){
        minus();
        balance = address(this).balance;
        /**
        *   this: 在合约中，this 关键字代表合约本身。
        *   address(this): 将合约实例转换为它的地址类型。
        *   .balance: address 类型有一个内置的 .balance 属性，可以用来查询该地址当前拥有多少以太币（以最小单位 `wei` 计量）。
        *   所以，这行代码的作用是：查询当前合约账户的总 ETH 余额，并将其作为函数的返回值。
        */
    }
    
}