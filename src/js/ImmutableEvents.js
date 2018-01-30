"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseContract_1 = require("./BaseContract");
class ImmutableEvents extends BaseContract_1.default {
    constructor(provider, keyStore) {
        super(provider, provider, keyStore, null, null);
        const contractBinariesDir = process.cwd() + "/bin/contracts/";
        this.jsonInterface = BaseContract_1.default.loadJsonInterfaceFromFile(contractBinariesDir + "ImmutableEvents");
        this.contractBinary = BaseContract_1.default.loadBinaryFromFile(contractBinariesDir + "ImmutableEvents");
    }
    emitEvent(keyValues, signer, sendOptions) {
        return super.send("emitEvent", signer, sendOptions, keyValues);
    }
    getNextId() {
        return super.call("id");
    }
}
exports.default = ImmutableEvents;
//# sourceMappingURL=ImmutableEvents.js.map