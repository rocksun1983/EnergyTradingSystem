// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MeterRegistry is Ownable {

    constructor() Ownable(msg.sender) {}

    struct Meter {

        string meterNumber;

        address owner;

        bool active;

        uint256 registrationTime;
    }

    mapping(address => Meter)
        private s_meters;

    mapping(string => bool)
        private meterExists;

    event MeterRegistered(
        address indexed user,
        string meterNumber
    );

    event MeterDeactivated(
        address indexed user
    );

    function registerMeter(
        string memory meterNumber
    )
        external
    {
        require(
            bytes(meterNumber).length > 0,
            "Invalid meter"
        );

        require(
            !meterExists[meterNumber],
            "Meter already exists"
        );

        require(
            s_meters[msg.sender].owner ==
            address(0),
            "Already registered"
        );

        s_meters[msg.sender] = Meter({
            meterNumber: meterNumber,
            owner: msg.sender,
            active: true,
            registrationTime: block.timestamp
        });

        meterExists[meterNumber] = true;

        emit MeterRegistered(
            msg.sender,
            meterNumber
        );
    }

    function deactivateMeter(
        address user
    )
        external
        onlyOwner
    {
        s_meters[user].active = false;

        emit MeterDeactivated(user);
    }

    function getMeter(
        address user
    )
        external
        view
        returns (Meter memory)
    {
        return s_meters[user];
    }

    function isMeterActive(
        address user
    )
        external
        view
        returns (bool)
    {
        return s_meters[user].active;
    }
}