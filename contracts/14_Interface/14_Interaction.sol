// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 步骤 1: 定义一个接口 (API 文档)
// 这个接口规定了任何“计数器”合约应该具备的能力
interface ICounter{
    function count() external view returns (uint);
    function increment() external;
}

// 步骤 2: 创建一个实现了该接口的目标合约
contract Counter is ICounter {
    uint public count;

    // 实现 increment 函数
    // 因为 Counter 继承了 ICounter，所以必须实现 increment
    // override 关键字在这里是必需的
    function increment() public override {
        count += 1;
    }
}

// 步骤 3: 创建一个通过接口与目标合约交互的合约
// 这个合约是调用者
contract Interact {
    /**
     * @dev 通过接口调用 Counter 合约的 increment() 函数
     * @param _counterAddress 目标 Counter 合约的地址
     */
    function incrementCounter(address _counterAddress) external {
        // 关键：将地址包装成一个可调用的接口实例
        ICounter counter = ICounter(_counterAddress);
        // 通过接口实例调用目标合约的函数
        counter.increment();
    }

    /**
     * @dev 通过接口调用 Counter 合约的 count() 函数
     * @param _counterAddress 目标 Counter 合约的地址
     * @return The current count from the target contract
     */
    function getCount(address _counterAddress) external view returns (uint) {
        // 同样，将地址包装成接口实例
        ICounter counter = ICounter(_counterAddress);
        // 调用接口函数并返回结果
        return counter.count();
    }
}