"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenMetadata = exports.getMetadataKey = void 0;
const clients_1 = require("./clients");
const ts_try_1 = require("ts-try");
const sharp_1 = __importDefault(require("sharp"));
/**
 * Get the token metadata cache key
 * @param tokenId The token ID
 */
const getMetadataKey = (tokenId) => `metadata_${tokenId}`;
exports.getMetadataKey = getMetadataKey;
/**
 * Get the token metadata for the provided `tokenId`
 * @param tokenId The token ID
 */
const getTokenMetadata = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    const key = (0, exports.getMetadataKey)(tokenId);
    const cachedMetadata = yield clients_1.redis.get(key);
    if (cachedMetadata) {
        return JSON.parse(cachedMetadata);
    }
    const dataURI = yield (0, ts_try_1.tryF)(() => clients_1.nounsTokenContract.dataURI(tokenId));
    if ((0, ts_try_1.isError)(dataURI)) {
        console.error(`Error fetching dataURI for token ID ${tokenId}: ${dataURI.message}`);
        return;
    }
    const data = JSON.parse(Buffer.from(dataURI.substring(29), 'base64').toString('ascii'));
    const svg = Buffer.from(data.image.substring(26), 'base64');
    const png = yield (0, sharp_1.default)(svg).png().toBuffer();
    const imageCID = yield clients_1.storage.storeBlob(png);
    const metadata = {
        name: data.name,
        description: data.description,
        image: `ipfs://${imageCID}`,
    };
    yield clients_1.redis.set(key, JSON.stringify(metadata));
    return metadata;
});
exports.getTokenMetadata = getTokenMetadata;
