export const ENERGY_TOKEN =
  "0x45C808675eB8359fc1ec2436772eC613ED824caB";

export const METER_REGISTRY =
  "0x7744a9fFf5D7b01E7854E8e4c0Ea7D9A13058edf";

export const MARKETPLACE =
  "0x8eb46e20C1257a375aA3b287AFfFCDe7a45288D3";

export const energyTokenAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender,uint256 amount) returns (bool)",
  "function transfer(address to,uint256 amount) returns (bool)"
];

export const meterRegistryAbi = [
  "function registerMeter(string meterNumber)",
  "function getMeter(address user) view returns (string,uint256,bool)"
];

export const marketplaceAbi = [
  "function listingCounter() view returns (uint256)",

  "function listEnergy(uint256 units,uint256 price)",

  "function buyEnergy(uint256 listingId)",

  "function listings(uint256) view returns (uint256,address,uint256,uint256,bool)"
];