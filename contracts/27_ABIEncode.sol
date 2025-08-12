// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ABIEncode{
    // Example state variables to encode
    uint public x = 10;
    address public addr = 0x7A58c0Be72BE218B41C608b7Fe7C5bB630736C71;
    string public name = "0xAA";
    uint[2] public array = [5,6];

    // 外部交互用ether.js,内部相互调用需要使用abi，类似Java中的fegin接口调用服务
    // Demonstrates abi.encode
    function encode() public view returns(bytes memory){
        return abi.encode(x,addr,name,array);
    }

    // Demonstrates abi.encodePacked
    function encodePacked() public view returns(bytes memory){
        return abi.encodePacked(x,addr,name,array);
    }

    // Demonstrates abi.encodeWithSignature
    function encodeWithSignature() public view returns(bytes memory){
        return abi.encodeWithSignature("foo(uint256,address,string,uint256[2])",x,addr,name,array);
    }

    // Demonstrates abi.encodeWithSelector
    function encodeWithSelector() public view returns(bytes memory){
        bytes4 selector = bytes4(keccak256("foo(uint256,address,string,uint256[2])"));
        return abi.encodeWithSelector(selector,x,addr,name,array);
    }

    // Demonstrates abi.decode
    function decode(bytes memory data) public pure returns(uint256 decodeX,address decodeAddr,string memory decodeName,uint[2] memory decodeArray){
        (decodeX,decodeAddr,decodeName,decodeArray) = abi.decode(data,(uint,address,string,uint[2]));
    }
}