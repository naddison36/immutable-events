

export declare interface KeyStore {
    getPrivateKey(address: string): Promise<string>;
}