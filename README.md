# Immutable Events
Smart contract to make key-value data immutable

This is a project to demonstrate how data can be made immutable on an Ethereum blockchain. It uses a simple, smart contract that takes key-value pairs of data and emits them in an event. This event is then stored in the Blockchain for as long as there are nodes running to maintain the state.

This project also demonstrates using Solidity's new Application Binary Interface (ABI) that allows `struct` data types to be used in public or external functions and events.

## Installation

Clone the repository and install the dependent packages using node package manager (npm)
```
git clone https://github.com/naddison36/immutable-events.git
cd immutable-events
npm install
```

You need to run an Ethereum blockchain to be able to test the smart contract. This can be done by running a development version of the Ethereum Geth or Parity clients. See [here](./scripts/README.md) for instructions on installing and configuring either Geth or Parity for development and testing purposes.

## Smart Contract
The Solidity code for the smart contract can be found in [contracts/ImmutableEvents.sol](./contracts/ImmutableEvents.sol).

The following lines ensure the latest Solidity compiler is used with the new experimental ABI encoding. This new encoding allows `struct` data types to be used in public or external functions and events.
```
pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;
```

The struct for the key-value pair is just two properties of type string
```
struct KeyValue {
        string key;
        string value;
    }
```

The Solidity function that takes an array of key-value pairs and emits them in an event is
```
function emitEvent(KeyValue[] keyValues) public returns (bool)
    {
        ImmutableEvent(id++, keyValues);
        return true;
    }
```

## Compiling Solidity
The following command will use the `solc` compile that is installed via the npm dependencies
```
npm run compileSol
```

## Clients

### JavaScript
A JavaScript client is available in the [src/js](./src/js) folder. It is written in TypeScript which transcompiles to JavaScript. It uses the [Ethers.js](https://docs.ethers.io/ethers.js/html/) library to connect to an Ethereum node, send signed Ethereum transactions and receive events.

The TypeScript class that interacts with the ImmutableEvent smart contract is [src/js/ImmutableEvents.ts](./src/js/ImmutableEvents.ts). Most of the Ethers.js code is abstracted away in [BaseContract.ts](./src/js/BaseContract.ts) which can be used to abstract any solidity contract.

### Usage

```JS
import {providers as Providers} from 'ethers';
import ImmutableEvents from "../ImmutableEvents";
import KeyStore from '../keyStore/keyStore-hardcoded';

// uses a JSON RPC provider for the Ethereum connection. Other options are Infura and Etherscan
const provider = new Providers.JsonRpcProvider("http://localhost:8646", "unspecified");

const immutableEvents = new ImmutableEvents(provider, new KeyStore() );

// Deploy a new ImmutableEvents contract to the Ethereum blockchain
// The address is the account that will sign the Ethereum transaction.
// The private key for the address needs to have been setup in the KeyStore.
const txReceipt = await immutableEvents.deployContract('0x1563915e194d8cfba1943570603f7606a3115508');

// Make some data immutable
const txReceipt = await immutableEvents.emitEvent([{key: "testKey", value: "testValue"}]);
```

#### Tests
The JavaScript client comes with Jest tests in [src/js/__tests__/ImmutableEvents.test.ts](./src/js/__tests__/ImmutableEvents.test.ts). The tests can be run using
```
npm test
```

Make sure either Geth or Parity is running otherwise the tests with fail with `invalid json response`. These can be run with either
```
npm run startGeth
```
or 
```
npm run startParity
```

#### Key Store
When you instantiate the ImmutableEvent class you need to pass is a KeyStore which has the following interface defined in [src/js/keyStore/index.d.ts](./src/js/keyStore/index.d.ts)
```
export declare interface KeyStore {
    getPrivateKey(address: string): Promise<string>;
}
```

This project comes with a hacky hardcoded implementation [keyStore-hardcoded.ts](./src/js/keyStore/keyStore-hardcoded.ts) and a slightly better, but not production usable, implementation that uses environment variables [keyStore-env.ts](./src/js/keyStore/keyStore-env.ts). For production use, implementations that used a Hardware Security Module (HSM) or cloud key stores like the following would be used.
1. Azure Key Vault
2. Google Cloud Key Management Service (KMS)
3. AWS Key Management Service (KMS)

## Known Errors
Ethers.js is not currently reading the ImmutableEvents event which contains the `struct`. Issue [109](https://github.com/ethers-io/ethers.js/issues/109) has been raised with the Ethers.js project.

## TODO
Using string to serialize data is not the most cost effective way of storing data in a Blockchain. Ideally there would be more compact data serialisation formats that will make it cheaper to make data immutable.

### Credits
A huge thanks for Christian Reitwiessner (@chriseth) for implementing the new ABI encoder in Solidity and Richard Moore (@ricmoo) for the Ethers.js client library that was the first Ethereum client to support the new ABI encoder.