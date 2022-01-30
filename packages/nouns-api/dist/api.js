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
exports.createAPI = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
/**
 * Create the express app and attach routes
 */
const createAPI = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/', (_req, res) => {
        res.status(200).send({
            message: 'Nouns API Root',
        });
    });
    app.get('/metadata/:tokenId', (0, express_validator_1.param)('tokenId').isInt({ min: 0, max: 1000 }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const metadata = yield (0, utils_1.getTokenMetadata)(req.params.tokenId);
        if (!metadata) {
            return res.status(500).send({ error: 'Failed to fetch token metadata' });
        }
        res.send(metadata);
    }));
    return app;
};
exports.createAPI = createAPI;
