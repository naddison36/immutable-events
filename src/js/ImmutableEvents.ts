import * as BN from 'bn.js';

import BaseContract, {SendOptions, TransactionReceipt} from './BaseContract';
import {KeyValue} from "./index";

export default class ImmutableEvents extends BaseContract
{
    emitEvent(keyValues: KeyValue[], signer?: string, sendOptions?: SendOptions): Promise<TransactionReceipt>
    {
        return super.send("emitEvent", signer, sendOptions, keyValues);
    }

    getNextId(): Promise<BN>
    {
        return super.call("id");
    }
}
