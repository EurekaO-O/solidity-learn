// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title InitialValueContract
 * @dev 演示 Solidity 中各种变量类型的初始（默认）值.
 */
contract InitialValue{
    // 值类型
    bool public _bool; // 初始值:false;
    string public _string;// 初始值:"";
    int public _int;// 初始值:0;
    uint public _uint;// 初始值:0;
    address public _address;// 初始值:0x0000000000000000000000000000000000000000;

    enum ActionSet{Buy,Hold,Sell}
    ActionSet public _enum;// 初始值:第一个成员Buy(索引为0)

    // 引用类型
    uint[8] public _staticArray;// 初始值:[0, 0, 0, 0, 0, 0, 0, 0];
    uint[] public _dynamicArray;// 初始值:[]空数组;
    // 添加getter函数
    function getStaticArray() external view returns (uint[8] memory){
        return _staticArray;
    }
    function getDynamicArray() external view returns (uint[] memory){
        return _dynamicArray;
    }

    mapping(uint => address) public _mapping;// 初始值:一个所有键都返回零地址的映射

    struct Student{
        uint256 id;
        uint256 score;
    }
    Student public student; // 初始值:Student({id:0,score:0})

    // 用于测试 delete 操作符的变量
    bool public boolToDelete = true;


    /**
    * @dev 使用 delete 关键字将 boolToDelete 的值重置为该类型的初始值 (false).
    */
    function deleteBool() external {
        delete boolToDelete;
    }
    // delete关键字：在solidity中是重置，不是销毁
    /**
     * delete 关键字的确会把变量的值改成该类型的初始值。

    这和其他很多编程语言中的 delete 非常不一样。在 JavaScript 或 C++ 等语言中，delete 通常用来释放内存或移除对象的属性。但在 Solidity 中，它的行为是重置（Reset），而不是销毁（Destroy）。

    工作原理和原因：

    区块链的存储模型：以太坊的存储可以看作是一个巨大的键值对数据库（从 256 位的槽位地址映射到 256 位的数据）。一个状态变量一旦被声明，它就永久地占据了合约存储空间中的一个或多个槽位。你不能真正地“删除”这个槽位，让它消失。

    delete 的作用：delete a; 这行代码的实际作用是，找到变量 a 所占据的那个存储槽位，并将这个槽位里的数据全部改写为零。

“   零”即“初始值”：由于 Solidity 的设计哲学，一个全零的存储槽位，就代表了该类型的初始值。

    对于 bool 类型的变量，它只占一个字节。delete 会把这个字节置为 0x00，这在布尔逻辑中就代表 false。
    对于 uint256，delete 会把整个 32 字节的槽位置为零，这自然就代表了数字 0。
    对于 address，同样是置为零，这就得到了零地址 0x000...000。
    delete 的一个重要经济意义：Gas 返还

    在以太坊上，存储是非常昂贵的资源。为了鼓励开发者节约使用存储空间，EVM 设计了一个 Gas 返还机制。当你通过 delete 操作清空一个之前非零的存储槽位（即把它从非零值改为零值）时，你会在交易结束时获得一部分 Gas 返还。

    这使得 delete 不仅是一个状态重置工具，也是一个在某些场景下（比如一个状态不再需要时）优化 Gas 成本的重要手段。
     */
}