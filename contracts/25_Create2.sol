// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Pair{
    address public factory;
    address public token0;
    address public token1;

    constructor(){
        factory = msg.sender;
    }

    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'Pair: FORBIDDEN');
        token0 = _token0;
        token1 = _token1;
    }
}

// The factory contract, updated to use CREATE2.
contract PairFactory2{
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    // The function to create a pair using CREATE2
    function createPair2(address tokenA,address tokenB)external returns(address pairAddr){
        require(tokenA != tokenB,'IDENTICAL_ADDRESSES');
    
        // Sort tokens to ensure the salt is always the same for a given pair
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);

        // Create the salt by hashing the sorted token addresses
        bytes32 salt = keccak256(abi.encodePacked(token0,token1));

        // Deploy the new contract using CREATE2 with the calculated salt
        Pair pair = new Pair{salt : salt}();

        // Initialize the new pair
        pair.initialize(tokenA,tokenB);

        // Store the new pair's address
        pairAddr = address(pair);
        allPairs.push(pairAddr);
        getPair[tokenA][tokenB] = pairAddr;
        getPair[tokenB][tokenA] = pairAddr;
    }

    // A view function to predict the address of a pair witout deploying it
    function calculateAddr(address tokenA, address tokenB) public view returns (address predictedAddress) {
        require(tokenA != tokenB, 'IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        
        // This is the formula for calculating a CREATE2 address.
        predictedAddress = address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(type(Pair).creationCode)
        )))));
    }
}
