"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nounsTokenContract = exports.jsonRpcProvider = exports.redis = exports.storage = void 0;
const config_1 = require("./config");
const ethers_1 = require("ethers");
const nft_storage_1 = require("nft.storage");
const contracts_1 = require("@nouns/contracts");
const ioredis_1 = __importDefault(require("ioredis"));
/**
 * IFPS Storage Client
 */
exports.storage = new nft_storage_1.NFTStorage({ token: config_1.config.nftStorageApiKey });
/**
 * Redis Client
 */
exports.redis = new ioredis_1.default(config_1.config.redisPort, config_1.config.redisHost);
/**
 * Ethers JSON RPC Provider
 */
exports.jsonRpcProvider = new ethers_1.providers.JsonRpcProvider(config_1.config.jsonRpcUrl);
/**
 * Nouns ERC721 Token Contract
 */
exports.nounsTokenContract = new ethers_1.Contract(config_1.config.nounsTokenAddress, contracts_1.NounsTokenABI, exports.jsonRpcProvider);
