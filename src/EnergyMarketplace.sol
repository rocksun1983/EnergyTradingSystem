// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EnergyMarketplace is
    Ownable,
    Pausable,
    ReentrancyGuard
{
    IERC20 public immutable energyToken;

    uint256 public listingCounter;

    struct Listing {

        uint256 id;

        address seller;

        uint256 energyUnits;

        uint256 price;

        bool active;
    }

    mapping(uint256 => Listing)
        public listings;

    event EnergyListed(
        uint256 indexed id,
        address indexed seller,
        uint256 units,
        uint256 price
    );

    event EnergyPurchased(
        uint256 indexed id,
        address indexed buyer,
        uint256 units
    );

    event ListingCancelled(
        uint256 indexed id
    );

    constructor(
        address tokenAddress
    )
        Ownable(msg.sender)
    {
        energyToken =
            IERC20(tokenAddress);
    }

    function listEnergy(
        uint256 units,
        uint256 price
    )
        external
        whenNotPaused
    {
        require(
            units > 0,
            "Units must be > 0"
        );

        require(
            price > 0,
            "Price must be > 0"
        );

        listings[listingCounter] =
            Listing({
                id: listingCounter,
                seller: msg.sender,
                energyUnits: units,
                price: price,
                active: true
            });

        emit EnergyListed(
            listingCounter,
            msg.sender,
            units,
            price
        );

        listingCounter++;
    }

    function buyEnergy(
        uint256 listingId
    )
        external
        nonReentrant
        whenNotPaused
    {
        Listing storage item =
            listings[listingId];

        require(
            item.active,
            "Inactive listing"
        );

        require(
            item.seller != msg.sender,
            "Cannot buy own listing"
        );

        bool success =
            energyToken.transferFrom(
                msg.sender,
                item.seller,
                item.price
            );

        require(
            success,
            "Payment failed"
        );

        item.active = false;

        emit EnergyPurchased(
            listingId,
            msg.sender,
            item.energyUnits
        );
    }

    function cancelListing(
        uint256 listingId
    )
        external
    {
        Listing storage item =
            listings[listingId];

        require(
            item.seller == msg.sender,
            "Not owner"
        );

        require(
            item.active,
            "Already inactive"
        );

        item.active = false;

        emit ListingCancelled(
            listingId
        );
    }

    function pause()
        external
        onlyOwner
    {
        _pause();
    }

    function unpause()
        external
        onlyOwner
    {
        _unpause();
    }
}