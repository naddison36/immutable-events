import {provider as Provider} from 'ethers';
import * as BN from 'bn.js';

import BaseContract, {SendOptions, TransactionReceipt} from './BaseContract';
import {KeyValue} from "./index";
import {KeyStore} from "./keyStore";

export default class ImmutableEvents extends BaseContract
{
    constructor(provider: Provider, keyStore: KeyStore)
    {
        super(provider, provider, keyStore, null, null);

        const contractBinariesDir = process.cwd() + "/bin/contracts/";
        this.jsonInterface = BaseContract.loadJsonInterfaceFromFile(contractBinariesDir + "ImmutableEvents");
        this.contractBinary = BaseContract.loadBinaryFromFile(contractBinariesDir + "ImmutableEvents");
    }

    emitEvent(keyValues: KeyValue[], signer?: string, sendOptions?: SendOptions): Promise<TransactionReceipt>
    {
        return super.send("emitEvent", signer, sendOptions, keyValues);
    }

    getNextId(): Promise<BN>
    {
        return super.call("id");
    }
}
