// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Implementation is Initializable {
  address payable public owner;

  event Withdrawal(uint amount, uint when, address indexed to);

  function initialize(address newOwner) payable external initializer {
    // empty initializer
    owner = payable(newOwner);
  }


  function withdraw(address payable sendFundsTo) public {
    require(msg.sender == owner, "You aren't the owner");

    emit Withdrawal(address(this).balance, block.timestamp, sendFundsTo);

    sendFundsTo.transfer(address(this).balance);
  }
}
