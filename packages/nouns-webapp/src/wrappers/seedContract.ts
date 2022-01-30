import { Contract } from 'ethers';
import { default as config, provider } from '../config';

const address: string = config.seedContract;

const abi: string = '[{"inputs": [], "name": "i", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "bytes32","name": "targetBlockHash","type": "bytes32"}],"name": "inc","outputs": [],"stateMutability": "nonpayable","type": "function"}]';

export const contract = new Contract(address, abi, provider);