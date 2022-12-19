// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.17;

import "./Implementation.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract Factory is OwnableUpgradeable {

  address public dummyImplementation;

  // --- Event ---

  event ImplementationUpdated(address dummyImplementationAddress);

  event DummyCreated(address indexed dummyImplementationAddress, address indexed dummyImplementation);


  /// @notice constructor function which ensure deployer is set as owner
  function initialize() external initializer {
    __Context_init_unchained();
    __Ownable_init_unchained();
  }

  // --- Core methods ---


  function updateImplementationContract(address newDummyImplementation) external onlyOwner {
    dummyImplementation = newDummyImplementation;

    emit ImplementationUpdated(newDummyImplementation);
  }


  function create() external returns (address) {

    address clone = ClonesUpgradeable.clone(dummyImplementation);

    emit DummyCreated(clone, dummyImplementation);

    Implementation(clone).initialize(msg.sender);

    return clone;
  }

}