// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Hash{
    // Hashes multiple arguments using keccak256 and abi.encodePacked.
    function hash(uint _num,string memory _string,address _addr)public pure returns(bytes32){
        // This is the standard pattern for hashing multiple variables
        return keccak256(abi.encodePacked(_num,_string,_addr));
    }

    // Hashes a single string.
    function hashString(string memory _string) public pure returns(bytes32){
        return keccak256(abi.encodePacked(_string));
    }
}