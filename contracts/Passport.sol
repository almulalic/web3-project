// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ReentrancyGuard.sol";

contract PassportDID is Ownable, ReentrancyGuard {
  struct Passport {
      uint256 id;
      string did;
      string name;
      string nationality;
      uint256 birthDate;
      uint256 issueDate;
      uint256 expiryDate;
  }

  constructor() Ownable(msg.sender) {
  }

  uint256 private _passportCounter;

  mapping(address => Passport) private passports;
  mapping(string => address) private didToAddress;
  mapping(uint256 => address) private idToAddress;

  event PassportIssued(address indexed owner, uint256 id, string did);
  event PassportRevoked(address indexed owner, uint256 id, string did);

  modifier onlyPassportHolder() {
      require(bytes(passports[msg.sender].did).length != 0, "Not a passport holder");
      _;
  }

  function issuePassport(
      address _owner,
      string memory _did,
      string memory _name,
      string memory _nationality,
      uint256 _birthDate,
      uint256 _expiryDate
  ) public onlyOwner {
    require(didToAddress[_did] == address(0), "DID already exists");

    _passportCounter += 1;
    uint256 newPassportId = _passportCounter;

    passports[_owner] = Passport({
        id: newPassportId,
        did: _did,
        name: _name,
        nationality: _nationality,
        birthDate: _birthDate,
        issueDate: block.timestamp,
        expiryDate: _expiryDate
    });

    didToAddress[_did] = _owner;
    idToAddress[newPassportId] = _owner;

    emit PassportIssued(_owner, newPassportId, _did);
  }

  function revokePassport(address _owner) public onlyOwner {
    require(bytes(passports[_owner].did).length != 0, "Passport does not exist");

    string memory did = passports[_owner].did;
    uint256 id = passports[_owner].id;

    delete didToAddress[did];
    delete idToAddress[id];
    delete passports[_owner];

    emit PassportRevoked(_owner, id, did);
  }

  function getPassport(address _owner) public view returns (Passport memory) {
    return passports[_owner];
  }

  function getPassportByDID(string memory _did) public view returns (Passport memory) {
    address owner = didToAddress[_did];

    require(owner != address(0), "DID does not exist");
    return passports[owner];
  }

  function getPassportById(uint256 _id) public view returns (Passport memory) {
    address owner = idToAddress[_id];
    require(owner != address(0), "ID does not exist");

    return passports[owner];
  }
}
