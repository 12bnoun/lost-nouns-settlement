import { Contract, providers } from 'ethers';
import { NFTStorage } from 'nft.storage';
import Redis from 'ioredis';
/**
 * IFPS Storage Client
 */
export declare const storage: NFTStorage;
/**
 * Redis Client
 */
export declare const redis: Redis.Redis;
/**
 * Ethers JSON RPC Provider
 */
export declare const jsonRpcProvider: providers.JsonRpcProvider;
/**
 * Nouns ERC721 Token Contract
 */
export declare const nounsTokenContract: Contract;
