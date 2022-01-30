import { default as globalConfig, PROVIDER_KEY } from '../config';

import { contract as AuctionContract } from '../wrappers/nounsAuction';
import { setAuctionEnd } from '../state/slices/auction';
import { setEthereumConnected, setBlockAttr } from '../state/slices/block';
import { setNextNounId } from '../state/slices/noun';

import { w3cwebsocket as W3CWebSocket } from 'websocket';
// import { checkForSettlement } from './ethersProvider';


// Define the Actions Intercepted by the Middleware
const openEthereumSocket = (payload) => ({type: 'ethereumSocket/open', payload});
const closeEthereumSocket = (payload) => ({type: 'ethereumSocket/close', payload});


// Define the Middleware
const alchemyWebsocketMiddleware = () => {
  let socket = null;
  let blockSubscription = '0x';
  let blockId = 44;
  let latestObservedBlock = 0;

  const openSocket = () => { console.log('opensocket'); return new W3CWebSocket(`wss://eth-${globalConfig.chainName}.alchemyapi.io/v2/${PROVIDER_KEY}`) };
  const closeSocket = () => { if (socket !== null) socket.close() };

  // Websocket Parsing & Sending Message
  const parseMessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);
      if (data?.params?.subscription === blockSubscription) {
        return data.params.result;
      } else if (data.id === blockId) {
        blockSubscription = data.result;
      }
    } catch(e) {
      console.log('Error parsing Alchemy websocket message');
      console.log(e);
    }
  }

  const newBlockSubscriptionRequest = JSON.stringify({
    "jsonrpc":"2.0",
    "id": blockId,
    "method": "eth_subscribe",
    "params": ["newHeads"]
  });


  // Define the Handler Methods
  const handleOpen = store => () => {
    console.log('Alchemy Web Socket OPEN.');
    store.dispatch(setEthereumConnected(true));
    socket.send(newBlockSubscriptionRequest);
  }

  const handleMessage = store => (msg) => {
    let data = parseMessage(msg);

    if (!data) return; // Not a new block notification

    const blockNumber = Number(data.number); // Convert from hex
    const blockHash = data.hash;
    // const logsBloom = data.logsBloom;

    if (latestObservedBlock >= blockNumber) {
      console.log(`Minor block re-org, skipping repeat blocknumber ${blockNumber}`);
      return;
    } else {
      console.log(`Updating blocknumber ${blockNumber}`);
      latestObservedBlock = blockNumber;
    }    

    // Check if settlement has occurred
    //store.dispatch(checkForSettlement(logsBloom));

    // Check the latest auction status
    AuctionContract.auction().then((auction) => {

      const nextNounId = parseInt(auction?.nounId);
      const auctionEnd = auction?.endTime.toNumber();

      store.dispatch(setNextNounId(nextNounId));
      store.dispatch(setAuctionEnd(auctionEnd));
    });

    // Update the Redux block information
    console.log(blockNumber);
    store.dispatch(setBlockAttr({'blocknumber': blockNumber, 'blockhash': blockHash}));
    //store.dispatch(resetVotes());
  }

  const handleClose = store => () => {
    console.log('Alchemy Web Socket CLOSED.');
    store.dispatch(setEthereumConnected(false));
    //store.dispatch(resetAuctionEnd());
  }


  // Define the Middleware
  return store => next => action => {
      console.log(action.type);
    if (action.type === 'ethereumSocket/open') {
      closeSocket();
      socket = openSocket();
      socket.onmessage = handleMessage(store);
      socket.onopen = handleOpen(store);
      socket.onclose = handleClose(store);
    }
    else if (action.type === 'ethereumSocket/close') {
      closeSocket();
    }
    else {
      return next(action);
    }
  };
};


export default alchemyWebsocketMiddleware();
export { openEthereumSocket, closeEthereumSocket };