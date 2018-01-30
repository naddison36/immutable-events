# Immutable Events
Smart contract to make key-value data immutable

This is a project to demonstrate how data can be made immutable on an Ethereum blockchain. It uses a simple smart contract that simply takes key-value pairs of data and emits them in an event. This event is then stored in the Blockchain for as long as there are nodes running to maintain the state.

This project also demonstrates using Solidity's new Application Binary Interface (ABI) that allows `struct` data types to be used in public or external functions and events.

## Installation

Clone the repository and install the dependent packages using node package manager (npm)
```
git clone https://github.com/naddison36/immutable-events.git
cd immutable-events
npm install
```

See [here](./scripts/README.md) for instructions on installing and configuring a development version Geth or Parity.

## Smart Contract
The Solidity code for the smart contract can be found in [contracts/ImmutableEvents.sol](./contracts/ImmutableEvents.sol).

The following lines ensure the latest Solidity compiler is used with the new experimental ABI encoding. This new encoding allows `struct` data types to be used in public or external functions and events.
```
pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;
```

The Solidity function that takes an array of key value pairs and emits them in an event is
```
function emitEvent(KeyValue[] keyValues) public returns (bool)
    {
        ImmutableEvent(id++, keyValues);
        return true;
    }
```

## Compiling Solidity
The following command will iuse the `solc` compile that is installed via the npm dependencies
```
npm run compileSol
```

## Clients

### JavaScript
A JavaScript client is available in the [src/js](./src/js) folder. It is actually written in TypeScript which transcompiles to JavaScript. It uses the [Ethers.js](https://docs.ethers.io/ethers.js/html/) library to connect to an Ethereum node, send signed Ethereum transactions and receive events.

The TypeScript class that interacts with the ImmutableEvent smart contract is [src/js/ImmutableEvents.ts](./src/js/ImmutableEvents.ts). Most of the Ethers.js code is abstracted away in [BaseContract.ts](./src/js/BaseContract.ts) which can be used to abstract any solidity contract.

#### Tests
The JavaScript client comes with Jest tests in [src/js/__tests__/ImmutableEvents.test.ts](./src/js/__tests__/ImmutableEvents.test.ts). The tests can be run using
```
npm test
```

Make sure either Geth or Parity is running otherwise the tests with fail with `invalid json response`.

#### Key Store
When you instantiate the ImmutableEvent class you need to pass is a KeyStore which has the following interface defined in [src/js/keyStore/index.d.ts](./src/js/keyStore/index.d.ts)
```
export declare interface KeyStore {
    getPrivateKey(address: string): Promise<string>;
}
```

This project comes with a hacky hardcoded implementation [keyStore-hardcoded.ts](./src/js/keyStore/keyStore-hardcoded.ts) and a slighty better, but not production usable, implementatino that uses environment variables [keyStore-env.ts](./src/js/keyStore/keyStore-env.ts). For production use, implementations that used a Hardware Security Module (HSM) or cloud key stores like the following would be used.
1. Azure Key Vault
2. Google Cloud Key Management Service (KMS)
3. AWS Key Management Service (KMS)

