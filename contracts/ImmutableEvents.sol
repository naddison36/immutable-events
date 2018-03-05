/*
A simple contract that makes key-value data pairs immutable in the Ethereum blockchain

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
See MIT Licence for further details.
<https://opensource.org/licenses/MIT>.
*/

pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

contract ImmutableEvents
{
    // Used to generate a unique id for each event that is emmitted
    // starting at 1 rather than 0 so it's clear an evenit id has been set. ie it's not 0 which is what numbers is initialised to
    uint256 public id = 1;

    struct KeyValue {
        string key;
        string value;
    }

    event ImmutableEvent(uint256 id, KeyValue[] keyValues);

    function emitEvent(KeyValue[] keyValues) public returns (bool)
    {
        ImmutableEvent(id++, keyValues);

        return true;
    }
}