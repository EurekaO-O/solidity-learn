// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 这是 OpenZeppelin 的 Strings 库的一个简化版本
// 我们把它放在这里，以便我们的合约可以使用它
library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
}


contract TestLibrary {
    // 方法1: 使用 using for 指令
    // 这会将 Strings 库中所有第一个参数为 uint256 的 internal 函数
    // “附加”到 uint256 类型上
    using Strings for uint256;

    function getString1(uint256 _number) public pure returns (string memory) {
        // 我们可以像调用成员函数一样调用库函数
        // _number 会自动作为 toHexString 的第一个参数传入
        return _number.toHexString();
    }

    // 方法2: 直接通过库合约名调用
    function getString2(uint256 _number) public pure returns (string memory) {
        // 这是更直接的调用方式
        return Strings.toHexString(_number);
    }
}