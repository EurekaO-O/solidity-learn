// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * 爷爷合约
 * 简单继承基础合约
 * 当函数被标记为 virtual 可以允许子合约重写
 */
contract Yeye{
    event Log(string msg);

    // 定义3个函数 hip pop yeye 都发出 Yeye 日志
    // 标记为 virtual 让子合约可以重写
    function hip() public virtual{
        emit Log("Yeye");
    }

    function pop() public virtual{
        emit Log("Yeye");
    }

    function yeye() public virtual{
        emit Log("Yeye");
    }
}

/**
 * @title Baba (爸爸) 合约
 * @dev 继承自 Yeye 并重写了部分函数。
 * `is Yeye` 表示单继承。
 */
contract Baba is Yeye{
    // 使用 `override` 关键字重写父合约的 `hip()` 和 `pop()` 函数
    // 注意：被重写的父函数必须是 `virtual`
    function hip() public virtual override{
        emit Log("Baba");
    }
    function pop() public virtual override{
        emit Log("Baba");
    }

    //这里添加一个独属于Baba合约的函数
    function baba() public virtual{
        emit Log("Baba");
    }
}

/**
 * @title Erzi (儿子) 合约
 * @dev 演示多重继承。它同时继承了 Yeye 和 Baba。
 */
contract Erzi is Yeye,Baba{
    // 当多个父合约有同名函数时 (例如这里的 hip 和 pop),
    // 子合约必须重写该函数，并在 `override` 关键字后明确指定所有父合约。
    // 继承顺序 `is Yeye, Baba` 是从最远(辈分最高)到最近，这是Solidity的强制要求。
    function hip() public virtual override(Yeye,Baba){
        emit Log("Erzi");
    }
    function pop() public virtual override(Yeye, Baba) {
        emit Log("Erzi");
    }
}