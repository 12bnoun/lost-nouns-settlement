"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    serverPort: Number((_a = process.env.SERVER_PORT) !== null && _a !== void 0 ? _a : 5000),
    redisPort: Number((_b = process.env.REDIS_PORT) !== null && _b !== void 0 ? _b : 6379),
    redisHost: (_c = process.env.REDIS_HOST) !== null && _c !== void 0 ? _c : 'localhost',
    nounsTokenAddress: (_d = process.env.NOUNS_TOKEN_ADDRESS) !== null && _d !== void 0 ? _d : '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
    jsonRpcUrl: (_e = process.env.JSON_RPC_URL) !== null && _e !== void 0 ? _e : 'http://localhost:8545',
    nftStorageApiKey: (_f = process.env.NFT_STORAGE_API_KEY) !== null && _f !== void 0 ? _f : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI1NjA0ZTA0YTkxYzcwOGM0MTU2OGZCRTcwMWVjNzVDY2IyMEM3MDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNDgxNDkxNzE4NCwibmFtZSI6Im5vdW5zIn0.f3D9WFLQv4fNGBivXMtbXiKK0ta_UN5RRS_eZCiNLJY',
};
