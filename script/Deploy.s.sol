// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";

import "../src/EnergyToken.sol";
import "../src/MeterRegistry.sol";
import "../src/EnergyMarketplace.sol";

contract Deploy is Script {

    function run() external {

        vm.startBroadcast();

        EnergyToken token =
            new EnergyToken();

        MeterRegistry registry =
            new MeterRegistry();

        EnergyMarketplace marketplace =
            new EnergyMarketplace(
                address(token)
            );

        console.log(
            "EnergyToken:",
            address(token)
        );

        console.log(
            "MeterRegistry:",
            address(registry)
        );

        console.log(
            "EnergyMarketplace:",
            address(marketplace)
        );

        vm.stopBroadcast();
    }
}