// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";

import "../src/EnergyToken.sol";
import "../src/MeterRegistry.sol";
import "../src/EnergyMarketplace.sol";

contract EnergyTradingSystemTest is Test {

    EnergyToken token;
    MeterRegistry registry;
    EnergyMarketplace market;

    address user1 = address(1);
    address user2 = address(2);

    function setUp() public {
        token = new EnergyToken();
        registry = new MeterRegistry();
        market = new EnergyMarketplace(address(token));
    }

    function testTokenDeployment() public view {
        assertEq(
            token.totalSupply(),
            10_000_000 * 1e18
        );
    }

    function testMeterRegistration() public {

        vm.prank(user1);

        registry.registerMeter(
            "AEDC123456"
        );

        MeterRegistry.Meter memory meter =
            registry.getMeter(user1);

        assertEq(
            meter.meterNumber,
            "AEDC123456"
        );

        assertEq(
            meter.owner,
            user1
        );

        assertTrue(
            meter.active
        );

        assertGt(
            meter.registrationTime,
            0
        );
    }

    function testListEnergy() public {

        vm.prank(user1);

        market.listEnergy(
            100,
            50 ether
        );

        (
            uint256 id,
            address seller,
            uint256 energyUnits,
            uint256 price,
            bool active
        ) = market.listings(0);

        assertEq(id, 0);
        assertEq(seller, user1);
        assertEq(energyUnits, 100);
        assertEq(price, 50 ether);
        assertTrue(active);
    }

    function testBuyEnergy() public {

        token.mint(
            user2,
            1000 ether
        );

        vm.prank(user1);

        market.listEnergy(
            200,
            100 ether
        );

        vm.startPrank(user2);

        token.approve(
            address(market),
            100 ether
        );

        market.buyEnergy(0);

        vm.stopPrank();

        (
            ,
            ,
            ,
            ,
            bool active
        ) = market.listings(0);

        assertFalse(active);

        assertEq(
            token.balanceOf(user1),
            100 ether
        );
    }

    function testCannotBuyOwnListing() public {

        token.mint(
            user1,
            1000 ether
        );

        vm.startPrank(user1);

        market.listEnergy(
            100,
            50 ether
        );

        token.approve(
            address(market),
            50 ether
        );

        vm.expectRevert(
            "Cannot buy own listing"
        );

        market.buyEnergy(0);

        vm.stopPrank();
    }

    function testPauseMarketplace() public {

        market.pause();

        vm.expectRevert();

        vm.prank(user1);

        market.listEnergy(
            100,
            10 ether
        );
    }
}