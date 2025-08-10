import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EventModule = buildModule("EventModule", (m) => {
  const eventContract = m.contract("Event");

  return { eventContract };
});

export default EventModule;