import React, { useContext } from "react";
import { HangContext } from "../Context/HangContext";

const GuessCount = (props) => {
  const { state } = useContext(HangContext);
  const { guessesLeft } = state;
  return (
    <div>
      <span className="text-white font-bold text-2xl">
        Guesses Left : <span className="text-white">{guessesLeft} </span>
      </span>
    </div>
  );
};

export default GuessCount;
