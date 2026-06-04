// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BillingContract {

    mapping(address => uint256)
        public consumption;

    function submitReading(
        uint256 units
    ) external {

        consumption[msg.sender] += units;
    }

    function calculateBill(
        address user,
        uint256 pricePerUnit
    )
        external
        view
        returns(uint256)
    {
        return
            consumption[user]
            * pricePerUnit;
    }
}