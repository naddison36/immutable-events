"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseContract_1 = require("./BaseContract");
class ImmutableEvents extends BaseContract_1.default {
    emitEvent(keyValues, signer, sendOptions) {
        return super.send("emitEvent", signer, sendOptions, keyValues);
    }
    getNextId() {
        return super.call("id");
    }
}
exports.default = ImmutableEvents;
//# sourceMappingURL=ImmutableEvents.js.map