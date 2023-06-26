// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Supplier.sol";

contract ProductVerifier {
    address supplierContractAddress;
    Supplier supplierContract;

    constructor(address _supplierContractAddress) {
        supplierContractAddress = _supplierContractAddress;
        supplierContract = Supplier(supplierContractAddress);
    }

    struct Product {
        uint256 itemNumber;
        string itemDestination;
    }

    function verifyProduct(
        uint256 _itemIndex,
        string memory _purchaseLocation
    ) public view returns (bool) {
        (
            uint256 itemNumber,
            ,
            ,
            ,
            string memory itemDestination
        ) = supplierContract.supplierItems(_itemIndex);
        uint256 lastTransactionIndex = supplierContract.getItemIndex() - 1;
        (, , , , string memory lastTransactionDestination) = supplierContract
            .supplierItems(lastTransactionIndex);
        return (itemNumber > 0 &&
            keccak256(bytes(lastTransactionDestination)) ==
            keccak256(bytes(_purchaseLocation)) &&
            keccak256(bytes(itemDestination)) ==
            keccak256(bytes(_purchaseLocation)));
    }
}
