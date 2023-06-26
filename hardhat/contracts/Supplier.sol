// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract Supplier is Ownable {
    struct Supplier_Item {
        uint256 itemNumber;
        uint256 itemPrice;
        string itemName;
        string itemSource;
        string itemDestination;
    }

    uint256 itemIndex;
    mapping(uint256 => Supplier_Item) public supplierItems;
    event supplierItem(
        uint256 itemIndex,
        uint256 itemPrice,
        uint256 itemNumber,
        string itemName,
        string itemSource,
        string itemDestination
    );

    function getItemIndex() public view returns (uint256) {
        return itemIndex;
    }

    function updateForSupplier(
        uint256 _itemNumber,
        string memory _itemName,
        string memory _itemSource,
        string memory _itemDestination,
        uint256 _itemPrice
    ) public {
        supplierItems[itemIndex].itemNumber = _itemNumber;
        supplierItems[itemIndex].itemName = _itemName;
        supplierItems[itemIndex].itemSource = _itemSource;
        supplierItems[itemIndex].itemDestination = _itemDestination;
        supplierItems[itemIndex].itemPrice = _itemPrice;
        emit supplierItem(
            itemIndex,
            supplierItems[itemIndex].itemPrice,
            supplierItems[itemIndex].itemNumber,
            supplierItems[itemIndex].itemName,
            supplierItems[itemIndex].itemSource,
            supplierItems[itemIndex].itemDestination
        );
        itemIndex++;
    }

    function triggerPayment(uint256 _itemIndex) public payable {
        require(
            supplierItems[_itemIndex].itemPrice == msg.value,
            "Full payment is required"
        );
    }
}
