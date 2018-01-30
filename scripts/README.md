# Testing
This project comes with pre configured Geth and Parity nodes for testing purposes. You only need one of these to deploy and invoke the function on the smart contract. You do not need to install both Geth and Parity.

## Geth

[Geth installation](https://github.com/ethereum/go-ethereum/wiki/Installing-Geth) instructions

### Initial Setup
In the [scripts](./scripts) folder, run the following commands on a Mac OSX or Linux platform
```
cd scripts
chmod a+x initGeth.sh
./initGeth.sh
```

This is start a new development blockchain using the [genesis.json](./scripts/genesis.json) file. The chain data will be under [testchain](./testchain) in the geth folder.

### Starting Geth
If the above initial setup has already been done, the development geth node can be started with
```
cd scripts
chmod a+x startGeth.sh
./startGeth.sh
```

## Parity

[Parity installation](https://paritytech.github.io/wiki/Setup) instructions

## Starting Parity
In the [scripts](./scripts) folder, run the following commands on a Mac OSX or Linux platform
```
cd scripts
chmod a+x startParity.sh
./startParity.sh
```

This is start a new development blockchain using the [testchainSpec.json](./scripts/testchainSpec.json) specification file and [parityDevConfig.toml](./scripts/parityDevConfig.toml) config file. The chain data will be under [testchain](./testchain) in the parity folder.

## Test Accounts
The pre-configured testing accounts.

| Test Actor | Account Number | Public Key | Private Key | Key File |
| --- | --- | --- |  --- | --- |
| Coinbase | 0 | 0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2a | 1111111111111111111111111111111111111111111111111111111111111111 | [file](../testchain/keystore/UTC--2018-01-30T00-04-36.639409000Z--19e7e376e7c213b7e7e7e46cc70a5dd086daff2a) |
| Contract Creator | 1 | 0x1563915e194d8cfba1943570603f7606a3115508 | 2222222222222222222222222222222222222222222222222222222222222222 | [file](../testchain/keystore/UTC--2018-01-30T00-07-21.237635000Z--1563915e194d8cfba1943570603f7606a3115508) |
| Event Emitter | 2 | 5cbdd86a2fa8dc4bddd8a8f69dba48572eec07fb | 3333333333333333333333333333333333333333333333333333333333333333 | [file](../testchain/keystore/UTC--2018-01-30T00-11-14.647269000Z--5cbdd86a2fa8dc4bddd8a8f69dba48572eec07fb) |

The password to the above testing accounts is `Immutable`. This is also stored in the [testpassword](./scripts/testpassword) file under the [scripts](./scripts) folder.

To import a private key into the Geth keystore run the following where [privateKey](./privateKey) is a file containing the private key without the leading 0x
```
geth account import --datadir ../testchain privateKey
```