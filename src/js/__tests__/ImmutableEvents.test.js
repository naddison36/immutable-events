"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const BN = require("bn.js");
const ImmutableEvents_1 = require("../ImmutableEvents");
const keyStore_hardcoded_1 = require("../keyStore/keyStore-hardcoded");
const contractOwner = '0x1563915e194d8cfba1943570603f7606a3115508';
describe("Immutable Events", () => {
    const jsonRpcProviderURL = process.env.RPCPROVIDER || "http://localhost:8646";
    const provider = new ethers_1.providers.JsonRpcProvider(jsonRpcProviderURL, "unspecified");
    const immutableEvents = new ImmutableEvents_1.default(provider, new keyStore_hardcoded_1.default());
    test('Deploy', async () => {
        expect.assertions(2);
        let txReceipt = await immutableEvents.deployContract(contractOwner);
        expect(txReceipt.status).toEqual(1);
        expect(txReceipt.contractAddress).toHaveLength(42);
    }, 20000);
    describe('Emit Events', () => {
        beforeAll(async () => {
            await immutableEvents.deployContract(contractOwner);
        });
        test("id has been initialised", async () => {
            expect(await immutableEvents.getNextId()).toEqual(new BN(1));
        }, 10000);
        test("Single key and value", async () => {
            expect.assertions(5);
            const txReceipt = await immutableEvents.emitEvent([{ key: "testKey", value: "testValue" }]);
            expect(txReceipt.status).toEqual(1);
            expect(await immutableEvents.getNextId()).toEqual(new BN(2));
            const simpleEvents = await immutableEvents.getEvents("SimpleEvent");
            expect(simpleEvents).toHaveLength(1);
            expect(simpleEvents[0].id).toHaveLength(1);
            // TODO get ImmutableEvent with an array of KeyValue structs working
            const events = await immutableEvents.getEvents("ImmutableEvent");
            expect(events).toHaveLength(1);
        }, 30000);
        test("Multiple key and values", async () => {
            expect.assertions(2);
            const txReceipt = await immutableEvents.emitEvent([
                {
                    key: "testKey1",
                    value: "testValue1"
                },
                {
                    key: "testKey2",
                    value: "testValue2"
                }
            ]);
            expect(txReceipt.status).toEqual(1);
            expect(await immutableEvents.getNextId()).toEqual(new BN(3));
        }, 20000);
        test("empty key and value array", async () => {
            expect.assertions(2);
            const txReceipt = await immutableEvents.emitEvent([]);
            expect(txReceipt.status).toEqual(1);
            expect(await immutableEvents.getNextId()).toEqual(new BN(4));
        }, 10000);
    });
});
//# sourceMappingURL=ImmutableEvents.test.js.map