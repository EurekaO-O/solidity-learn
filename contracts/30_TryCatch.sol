// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OtherContract{
    // 定义一个成功事件，函数成功执行的时候触发
    event Success();

    // 比如 这个函数要求入参必须是偶数
    function mustBeEven(uint256 _i) external{
        // 使用 require 检查i是否为偶数
        require(_i % 2 == 0,"Input must be an even number");

        // 如果检查通过，触发success
        emit Success();
    }

    // 这个函数在输入为 0 时会引发 Panic 异常 （0 除以 0的时候）
    function causePanic(uint256 _i ) external pure returns(uint256){
        // 如果 i 为0，这里会导致 Panic错误
        // Panic 是一种比 require 更严重的错误，通常由代码逻辑问题引起
        return 100 / _i;
    }

    // 定义一个自定义错误，提供自定义错误信息
    error MyCustomError(address caller,uint256 value);

    // 这个函数在特定条件下会抛出上面自定义的异常
    function throwCustomError(uint256 _i)external view{
        // 如果输入值 i 大于10
        if(_i > 10){
            // 就 revert 一个 MyCustomError 类型的错误，并传入调用者地址和输入值
            revert MyCustomError(msg.sender,_i);
        }
    }
}

// 主合约，将使用 try/catch 来处理来自 OtherContract 的异常
contract TryCatch{
    // 定义一系列事件，测试try catch的行为
    event CaughtError(string reason);      // 捕获到 Error(string) 类型的错误时触发
    event CaughtPanic(uint errorCode);     // 捕获到 Panic(uint) 类型的错误时触发
    event CaughtLowLevel(bytes lowLevelData); // 捕获到其他低级错误（如自定义错误）时触发
    event CallSuccess();                   // 当外部调用成功时触发

    // 声明一个状态变量，用于存储 OtherContract 实例的地址。
    OtherContract public otherContract;

    // 构造函数在部署 TryCatch 合约时执行。
    constructor() {
        // 创建一个新的 OtherContract 实例，并将其地址存入 otherContract 状态变量。
        // 通过 otherContract 来调用它的函数了。
        otherContract = new OtherContract();
    }
    // 示例 1: 在外部调用中使用 try/catch
    // 这个函数会尝试调用 otherContract.mustBeEven()
    function executeExternalCall(uint256 _i) external {
        // 'try' 关键字后面跟着你要尝试的外部调用。
        try otherContract.mustBeEven(_i) {
            // 如果调用成功，这里的代码块会执行。
            // 我们触发 CallSuccess 事件来记录成功。
            emit CallSuccess();
        } catch Error(string memory reason) {
            // 如果调用失败，并且错误是 Error(string) 类型（来自 require 或 revert），
            // 这个代码块会执行。
            // 'reason' 变量会自动捕获 require/revert 提供的错误信息字符串。
            emit CaughtError(reason);
        }
    }
    // 示例 2: 捕获 Panic 错误
    // 这个函数会尝试调用 otherContract.causePanic()
    function executePanic(uint256 _i) external {
        // 同样使用 try 关键字。注意，因为 causePanic 有返回值，
        // 我们也可以选择在 try 后面用 returns(...) 来接收，但这里我们为了演示方便就忽略了。
        try otherContract.causePanic(_i) {
            // 如果调用成功（即 _i 不为 0），则执行这里。
            emit CallSuccess();
        } catch Panic(uint errorCode) {
            // 如果调用时发生了 Panic 错误（例如 assert 失败、数组越界、除以零等），
            // 这个代码块会执行。
            // 'errorCode' 会捕获 Solidity 定义的错误码。
            // 例如，0x12 代表算术溢出或除以零。
            emit CaughtPanic(errorCode);
        }
    }
    // 示例 3: 捕获自定义错误或其他低级错误数据
    // 这个函数会尝试调用 otherContract.throwCustomError()
    function executeCustomError(uint256 _i) external {
        try otherContract.throwCustomError(_i) {
            // 如果调用成功（即 _i <= 10），则执行这里。
            emit CallSuccess();
        } catch (bytes memory lowLevelData) {
            // 这是一个通用的“全捕获”代码块。
            // 如果上面的 catch Error(string) 和 catch Panic(uint) 都没有匹配成功，
            // 就会进入这里。
            // 它非常适合用来捕获自定义错误，或者没有原因字符串的 revert()。
            // lowLevelData 变量会包含原始的返回数据（对于自定义错误，就是 ABI 编码后的错误数据）。
            emit CaughtLowLevel(lowLevelData);
        }
    }
}