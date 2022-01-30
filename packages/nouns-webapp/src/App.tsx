import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';

import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Noun  from './components/Noun';
// import VoteBar from './components/VoteBar';
// import VoteProgressBar from './components/VoteProgressBar';
// import SettledAuctionModal from './components/SettledAuctionModal';

import { setActiveAccount } from './state/slices/account';
// import { openVoteSocket, markVoterInactive } from './middleware/voteWebsocket';
import { openEthereumSocket } from './middleware/alchemyWebsocket';



function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { account } = useEthers();
  const dispatch = useAppDispatch();
  const useGreyBg = useAppSelector(state => state.noun.useGreyBg);

  useEffect(() => {
    dispatch(setActiveAccount(account));
  }, [dispatch, account]);

  useEffect(() => { // Only initialize after mount
    dispatch(openEthereumSocket());
  }, [dispatch]);

  // Deal with inactive users

  return (
    <div className={`${classes.App} ${useGreyBg ? classes.bgGrey : classes.bgBeige}`}>
      <Noun alt={"Current Block Noun"}/>
    </div>
  );
}

export default App;