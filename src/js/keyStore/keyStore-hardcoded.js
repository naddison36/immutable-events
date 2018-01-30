"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VError = require("verror");
class KeyStore {
    getPrivateKey(fromAddress) {
        return new Promise(async (resolve, reject) => {
            if (fromAddress == '0x19e7e376e7c213b7e7e7e46cc70a5dd086daff2a') {
                resolve('0x1111111111111111111111111111111111111111111111111111111111111111');
            }
            else if (fromAddress == '0x1563915e194d8cfba1943570603f7606a3115508') {
                resolve('0x2222222222222222222222222222222222222222222222222222222222222222');
            }
            else if (fromAddress == '0x5cbdd86a2fa8dc4bddd8a8f69dba48572eec07fb') {
                resolve('0x3333333333333333333333333333333333333333333333333333333333333333');
            }
            else if (fromAddress == '0x7564105e977516c53be337314c7e53838967bdac') {
                resolve('0x4444444444444444444444444444444444444444444444444444444444444444');
            }
            else {
                const error = new VError(`could not get private key for address ${fromAddress}`);
                reject(error);
            }
        });
    }
}
exports.default = KeyStore;
//# sourceMappingURL=keyStore-hardcoded.js.map