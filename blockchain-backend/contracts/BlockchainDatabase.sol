// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BlockchainDatabase {
    mapping(string => string) private database; // Key-value store

    event DataStored(string key, string value, address indexed sender);

    function storeData(string memory key, string memory value) public {
        database[key] = value;
        emit DataStored(key, value, msg.sender);
    }

    function retrieveData(string memory key) public view returns (string memory) {
        return database[key];
    }
}
