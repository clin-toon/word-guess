import React, { useContext, useEffect } from "react";
import { HangContext } from "../Context/HangContext";

const WordGuess = () => {
  const { state, decideAPICall, gameReset } = useContext(HangContext);
  const { spacesWord } = state;

  useEffect(() => {
    decideAPICall();
  }, [gameReset]);

  return (
    <div className="text-white">
      {spacesWord.length === 0 ? (
        <span className="font-bold text-3xl">Loading word..</span>
      ) : (
        spacesWord.map((letter, index) => {
          return (
            <span className="mx-2 font-bold text-3xl" key={index}>
              {letter}
            </span>
          );
        })
      )}
    </div>
  );
};

export default WordGuess;
