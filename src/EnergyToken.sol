// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract EnergyToken is ERC20, Ownable {

    uint256 public constant MAX_SUPPLY =
        100_000_000 * 10**18;

    constructor()
        ERC20("Energy Token", "ENG")
        Ownable(msg.sender)
    {
        _mint(msg.sender, 10_000_000 * 10**18);
    }

    function mint(
        address to,
        uint256 amount
    )
        external
        onlyOwner
    {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Max supply exceeded"
        );

        _mint(to, amount);
    }
}