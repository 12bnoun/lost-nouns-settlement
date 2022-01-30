import React, { useCallback, useEffect, useState } from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveBackground } from '../../state/slices/noun';
import classes from './Noun.module.css';

import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
const { palette } = ImageData;


const Noun: React.FC<{ alt: string }> = props => {
  const { alt } = props;

  const dispatch = useAppDispatch();
  const [img, setImg] = useState('');

  const blockhash = useAppSelector(state => state.block.blockHash);
  const nextNounId = useAppSelector(state => state.noun.nextNounId)!;
  const ethereumConnected = useAppSelector(state => state.block.connected);

  const generateNoun = useCallback(async () => {
    if (!blockhash) return;

    const adjNextNounId = 0;

    const seed = getNounSeedFromBlockHash(adjNextNounId, blockhash);
    console.log(seed);
    const { parts, background } = getNounData(seed);

    const svgBinary = buildSVG(parts, palette, background);
    setImg(`data:image/svg+xml;base64,${btoa(svgBinary)}`);
    dispatch(setActiveBackground(seed.background === 0));
  }, [dispatch, nextNounId, blockhash]);

  useEffect(() => {
    generateNoun();
  }, [generateNoun, blockhash]);
  

  let htmlImg, htmlAlt;
  if (!nextNounId || !ethereumConnected) {
    htmlImg = loadingNoun;
    htmlAlt = 'Loading Noun';
  } else {
    htmlImg = `data:image/svg+xml;base64,${img}`;
    htmlAlt = alt;
  }

  return (
    <div className={classes.imgWrapper}>
        <img className={classes.img}
          src={img}
          alt={htmlAlt}
          height="500px"
          width="500px"
        />
      </div>
  );
};

export default Noun;