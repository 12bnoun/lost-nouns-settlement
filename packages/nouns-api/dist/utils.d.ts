import { TokenMetadata } from './types';
/**
 * Get the token metadata cache key
 * @param tokenId The token ID
 */
export declare const getMetadataKey: (tokenId: string) => string;
/**
 * Get the token metadata for the provided `tokenId`
 * @param tokenId The token ID
 */
export declare const getTokenMetadata: (tokenId: string) => Promise<undefined | TokenMetadata>;
