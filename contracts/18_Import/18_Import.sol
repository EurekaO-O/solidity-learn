// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 1. NPM 包导入: 从 node_modules 导入 OpenZeppelin 的 Ownable 合约
// 这是使用外部依赖库的标准方式
import "@openzeppelin/contracts/access/Ownable.sol";

// 2. 相对路径导入: 导入我们自己项目中的 OtherContract.sol
// './' 表示当前目录
import "./18_OtherContract.sol";

// Import 合约继承了 Ownable，因此拥有了 owner 和 onlyowner 等功能
contract Import is Ownable {
    // 我们可以像使用本地定义的合约一样，使用导入的 OtherContract
    OtherContract public other;

    // 构造函数在部署时会自动将 msg.sender 设置为 owner
    // 我们在这里还部署了一个新的 OtherContract 实例
    constructor() Ownable(msg.sender) {
        other = new OtherContract();
    }

    // 这是一个只有 owner 才能调用的函数
    function setOtherX(uint256 _x) public onlyOwner {
        // 调用 other 合约实例的 setX 函数
        other.setX(_x);
    }

    function getOtherX() public view returns (uint256) {
        // 调用 other 合约实例的 x() getter 函数
        return other.x();
    }
}
