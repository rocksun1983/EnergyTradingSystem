import { ethers } from "ethers";

import EnergyTokenABI from "../abi/EnergyToken.json";
import MeterRegistryABI from "../abi/MeterRegistry.json";
import EnergyMarketplaceABI from "../abi/EnergyMarketplace.json";

import {
  ENERGY_TOKEN,
  METER_REGISTRY,
  ENERGY_MARKETPLACE
} from "./contracts";

export async function getContracts() {

  const provider =
      new ethers.BrowserProvider(
          window.ethereum
      );

  const signer =
      await provider.getSigner();

  const token =
      new ethers.Contract(
          ENERGY_TOKEN,
          EnergyTokenABI.abi,
          signer
      );

  const registry =
      new ethers.Contract(
          METER_REGISTRY,
          MeterRegistryABI.abi,
          signer
      );

  const marketplace =
      new ethers.Contract(
          ENERGY_MARKETPLACE,
          EnergyMarketplaceABI.abi,
          signer
      );

  return {
      token,
      registry,
      marketplace,
      signer
  };
}