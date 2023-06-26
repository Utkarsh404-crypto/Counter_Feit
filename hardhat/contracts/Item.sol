// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Manufacturer.sol";

contract Item {
    uint256 public priceInWei;
    uint256 public itemIndex;
    Manufacturer parentContract;

    constructor(
        Manufacturer _manufacturer,
        uint256 _itemIndex,
        uint256 _priceInWei
    ) {
        itemIndex = _itemIndex;
        priceInWei = _priceInWei;
        parentContract = _manufacturer;
    }

    receive() external payable {
        require(priceInWei == msg.value, "Full payment is required");
        (bool success, ) = address(parentContract).call{value: msg.value}(
            abi.encodeWithSignature("triggerPayment(uint256)", itemIndex)
        );
        require(success, "Transaction Cancelled");
    }
}
