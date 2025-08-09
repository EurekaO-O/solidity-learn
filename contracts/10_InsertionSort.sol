// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title InsertionSortContract
 * @dev 演示如何在 Solidity 中安全地实现插入排序算法，并展示常见的 uint 下溢陷阱.
*/
contract InsertionSort{
    /**
     * @dev 插入排序的错误实现.
     * 这个版本直接从其他语言翻译而来，没有考虑到 uint 的下溢问题.
     * 当 j 试图从 0 变为 -1 时，交易会因 Panic(0x11) 错误而回滚.
     * @param a 需要排序的 uint 数组.
     * @return memory 排序后的数组.
    */
    function insertionSortWrong(uint[] memory a)public pure returns(uint[] memory){
        for(uint i = 1; i < a.length;i++){
            uint temp = a[i];
            // 陷阱就在这里！当 i=0 时，j=i-1 会导致 j 变成一个巨大的数（旧版本）或直接报错（新版本）
            // 但实际上，当 i=1, j=0, 且 temp < a[0] 时，j-- 会让 j 尝试变成 -1，从而触发错误。
            uint j = i - 1;
            while((j >= 0) && (temp < a[j])){
                a[j+1] = a[j];
                j--;
            }
            a[j+1] = temp;
        }
        return a;
    }
    /**
     * @dev 插入排序的正确实现.
     * 通过调整循环变量 j 的范围和数组索引，避免了 j 出现负值的可能性.
     * @param a 需要排序的 uint 数组.
     * @return memory 排序后的数组.
    */
    function insertionSort(uint[] memory a)public pure returns(uint[] memory){
        for(uint i = 1; i < a.length; i++){
            uint temp = a[i];
            uint j = i;
            // 循环条件变为 j >= 1，并且在循环体内使用 a[j-1]
            // 当 j 递减到 1 时，如果条件满足，它会执行最后一次循环体，然后 j-- 变成 0。
            // 循环条件 (j >= 1) 变为 false，安全退出，避免了 j 尝试从 0 递减。
            while ((j >= 1) && (temp < a[j-1])){
                a[j] = a[j-1];
                j--;
            }
            a[j] = temp;
        }
        return a;
    }
}