// Type definitions for BTC Markets
// Project: btc-markets
// Definitions by: Nick Addison

import BN from 'bn.js';

import {SendOptions, TransactionReceipt, TransactionReceiptLog} from "./BaseContract";

export as namespace ImmutableEvents;

export = ImmutableEvents;

declare class ImmutableEvents
{
    constructor();

    emitEvent(keyValues: ImmutableEvents.KeyValue[], signer?: string, sendOptions?: SendOptions): Promise<TransactionReceipt>
    getNextId(): Promise<BN>;    
}

declare namespace ImmutableEvents
{
    export interface KeyValue {
        key: string,
        value: string
    }
}
