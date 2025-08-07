import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FunctionModule = buildModule("FunctionModule",(m) => {
    //直接部署 FunctionTypes 合约，没有构造函数
    const functionTypes = m.contract("FunctionTypes");

    return {functionTypes};
});

export default FunctionModule;

/**
 * 
 * 来回顾操作，这完美地展示了我们今天学习的所有知识点：
await functionTypes.number() -> 5n

你调用了 public 变量 number 的 getter 函数，成功读取了它的初始状态。
await functionTypes.add() -> (一个大的交易对象)

你调用了 add() 函数，它改变了链上状态。因此，它发起了一笔真实的交易，返回的是交易回执，而不是一个简单的数值。
await functionTypes.number() -> 6n

你再次读取状态，发现它已经被成功地从 5 修改为 6。
await functionTypes.addView() -> 7n

你调用了 view 函数。它读取了当前的状态 6，加上 1，然后返回了计算结果 7。它本身并没有改变状态。
await functionTypes.minusPayable({value: ethers.parseEther("1.0")}) -> (另一个交易对象)

你调用了 payable 函数，并且成功地向合约地址发送了 1 个 ETH。这也是一次状态改变（因为 minus() 被调用了）。
await functionTypes.number() -> 5n

你最后一次读取状态，确认它已经被 minus() 函数从 6 修改回 5。
 */


/**
 * 输出结果：
 * > const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
undefined
> const functionTypes = await ethers.getContractAt("FunctionTypes", contractAddress);
undefined
> const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
Uncaught SyntaxError: Identifier 'contractAddress' has already been declared
>
> await functionTypes.number()
5n
> await fun
function     

Function     

functionTypes

> await functionTypes.add()
ContractTransactionResponse {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],     
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]  
    },
    _networkName: 'localhost',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: []
  },
  blockNumber: 2,
  blockHash: '0xcd4efb284d0f9660211c632670ba037318462c61494bc9cb5045c1685acd2530',
  index: undefined,
  hash: '0x31b45ed52e0c348ae81c4f643fc87071b4d72f6e00345c4660a1de22191912b7',
  type: 2,
  to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  nonce: 1,
  gasLimit: 30000000n,
  gasPrice: 1767409213n,
  maxPriorityFeePerGas: 1000000000n,
  maxFeePerGas: 1971252285n,
  maxFeePerBlobGas: null,
  data: '0x4f2be91f',
  value: 0n,
  chainId: 31337n,
  signature: Signature { r: "0x3ab2df1043a5a8d74d1903d2584f53be7653c02e3e60756b22d2aac0470177d4", s: 
"0x4ce4e3cced22de0668cedebb2e78ca5653d5bdded3c724141a2f0045e0c0d375", yParity: 1, networkV: null },  
  accessList: [],
  blobVersionedHashes: null,
  authorizationList: null
}
> await functionTypes.number()
6n
> await functionTypes.addView()
7n
> await functionTypes.minusPayable({value: ehters.parseEther("1.0")})
Uncaught ReferenceError: ehters is not defined
    at REPL77:1:74
> await functionTypes.minusPayable({value: ethers.parseEther("1.0")})
ContractTransactionResponse {      
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'localhost',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: []
  },
  blockNumber: 3,
  blockHash: '0x8c109190edd8936a9127ff32064db2a4e7944b29ce53353d922815a2ba36c1e6',
  index: undefined,
  hash: '0x6b1a2a7c0f963bb348a70eb410b7d97a3d9dd312282c8f0fc8c179fa7c8243a0',
  type: 2,
  to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  nonce: 2,
  gasLimit: 30000000n,
  gasPrice: 1671651956n,
  maxPriorityFeePerGas: 1000000000n,
  maxFeePerGas: 1850059506n,
  maxFeePerBlobGas: null,
  data: '0x303810a6',
  value: 1000000000000000000n,
  chainId: 31337n,
  signature: Signature { r: "0xa0348d30c0072692b414479fabeb028e8cb1223b1ebd2c7b981225701c9f78ef", s: 
"0x0d487a8f36f34802db6b97af559497b8beca74d016a67ea7da98896f65d0c1ee", yParity: 0, networkV: null },  
  accessList: [],
  blobVersionedHashes: null,
  authorizationList: null
}
> await functionTypes.number()
5n
>
 */