import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// 定义一个我们将要传递给构造函数的参数
const INITIAL_RANDOM_NUMBER = 98765;

const ConstantModule = buildModule("ConstantModule", (m) => {
  // 使用 m.getParameter() 来正式地定义一个部署参数
  const initialRandomNumber = m.getParameter("initialRandomNumber", INITIAL_RANDOM_NUMBER);

  // 在 m.contract() 的第二个参数（一个数组）中传入构造函数所需的参数
  const constantContract = m.contract("Constant", [initialRandomNumber]);

  return { constantContract };
});

export default ConstantModule;