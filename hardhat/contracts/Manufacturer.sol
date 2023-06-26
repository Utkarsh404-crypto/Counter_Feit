// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";
import "./Item.sol";

contract Manufacturer is Ownable {
    struct Manufac_Item {
        Item _item;
        uint256 itemNumber;
        uint256 itemPrice;
        string itemName;
        string itemSource;
        string itemDestination;
    }

    uint256 itemIndex;
    mapping(uint256 => Manufac_Item) public manufacItems;
    event manufacturerItem(
        uint256 itemIndex,
        uint256 itemNumber,
        string itemName,
        string itemSource,
        string itemDestination,
        address _item
    );

    function createItemManufactuter(
        uint256 _itemNumber,
        string memory _itemName,
        string memory _itemSource,
        string memory _itemDestination,
        uint256 _itemPrice
    ) public onlyOwner {
        Item item = new Item(this, itemIndex, _itemPrice);
        manufacItems[itemIndex]._item = item;
        manufacItems[itemIndex].itemNumber = _itemNumber;
        manufacItems[itemIndex].itemName = _itemName;
        manufacItems[itemIndex].itemSource = _itemSource;
        manufacItems[itemIndex].itemDestination = _itemDestination;
        manufacItems[itemIndex].itemPrice = _itemPrice;
        emit manufacturerItem(
            itemIndex,
            manufacItems[itemIndex].itemNumber,
            manufacItems[itemIndex].itemName,
            manufacItems[itemIndex].itemSource,
            manufacItems[itemIndex].itemDestination,
            address(item)
        );
        itemIndex++;
    }

    function triggerPayment(uint256 _itemIndex) public payable {
        require(
            manufacItems[_itemIndex].itemPrice == msg.value,
            "Full payment is required"
        );
    }
}
