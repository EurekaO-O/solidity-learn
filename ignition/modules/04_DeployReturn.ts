import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ReturnModule = buildModule("ReturnModule",(m) =>{
    //部署 return 合约
    const returnContract = m.contract("Return");

    return { returnContract }
});

export default ReturnModule;