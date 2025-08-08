// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Return{
    // 1.返回多个变量
    // 使用 returns 声明返回的类型
    // 使用 return 在函数体中返回值
    function returnMultiple() public pure returns(uint256,bool,uint256[3] memory){
        return(1,true,[uint256(1),2,5]);
    }

    // 2. 命名式返回
    // 在 returns 中为返回变量命名，solidity会自动初始化
    // 比如只需要在函数体内赋值，就可以省略 return 语句
    function returnNamed() public pure returns(uint256 _number,bool _bool,uint256[3] memory _array){
        _number = 2;
        _bool = false;
        _array = [uint256(3),2,1];
    }

    // 3. 命名式返回也支持 return
    // 比如同时存在，会以 return 语句的为准
    function returnNamed2() public pure returns(uint256 _number,bool _bool,uint256[3] memory _array){
        return (1,true,[uint256(1),2,5]);
    }

    // 4. 解构式赋值的示例
    // 这个函数用来在合约内部调用上面的函数，并演示如何接受返回值
    function destructuringAssignments() public pure{
        //声明变量
        uint256 _number;
        bool _bool;
        uint256[3] memory _array;

        // a. 读取所有返回值
        (_number,_bool,_array) = returnNamed();

        // b. 读取部分返回值 （比如只读取bool）
        bool _bool2;
        (,_bool2,) = returnNamed();
    }
}