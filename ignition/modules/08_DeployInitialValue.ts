import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InitialValueModule = buildModule ("InitialValueModule",(m) => {
    const initialValueContract = m.contract("InitialValue");
    return { initialValueContract };
});

export default InitialValueModule;