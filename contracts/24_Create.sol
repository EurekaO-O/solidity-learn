// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Pair{
    address public factory; // Address of the factory that created this contract
    address public token0; // Address of the first token
    address public token1; // Address of the send token

    // It sets the factory address to the deployer's address (the PairFactory)
    constructor(){
        factory = msg.sender;
    }

    /**
     * @dev Initializes the token addresses for the pair.
     * This function is called once by the factory right after deployment.
     * It checks that only the factory can call this function.
     * @param _token0 The address of the first token.
     * @param _token1 The address of the second token.
     */
    function initialize(address _token0,address _token1) external{
        // Only the factory can call this function.
        require(msg.sender == factory,'Pair: FORBIDDEN');
        token0 = _token0;
        token1 = _token1;
    }
}

contract PairFactory{
    // Mapping to find a pair address using the two token addresses.
    mapping(address => mapping(address => address)) public getPair;
    // An array to store the addresses of all created pairs;
    address[] public allPairs;

    function createPair(address tokenA,address tokenB) external returns(address pairAddr){
        // 1. Deploy a new Pair contract
        Pair pair = new Pair();

        // 2. Call the initialize function on the new contract to set its tokens
        pair.initialize(tokenA,tokenB);

        // 3. Store the address of the new pair for future reference
        pairAddr = address(pair);
        allPairs.push(pairAddr);
        getPair[tokenA][tokenB] = pairAddr;
        getPair[tokenB][tokenA] = pairAddr;// Store it both ways for easy lookup.
    }
}
