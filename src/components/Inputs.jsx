import React, { useContext } from "react";
import { letters } from "../constants/letter";
import { HangContext } from "../Context/HangContext";

const Inputs = () => {
  const { addEnteredLetter, state, replaceLetters, checkForWinOrLoss } =
    useContext(HangContext);
  const { enteredLetter } = state;
  const handleClick = (letter) => {
    addEnteredLetter(letter);
    replaceLetters(letter);
  };

  return (
    <div className=" max-w-full border mx-2  w-auto rounded-lg">
      <h1 className="text-white font-bold text-3xl  text-center my-2">
        Select Letters
      </h1>

      <div className="text-white">
        {letters.map((letter) => {
          return (
            <button
              key={letter}
              className={` ${
                enteredLetter.includes(letter) &&
                "cursor-not-allowed hover:bg-none bg-gray-500"
              } p-2  rounded-sm font-bold text-2xl mx-2 hover:bg-gray-400`}
              onClick={() => handleClick(letter)}
              disabled={enteredLetter.includes(letter)}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Inputs;
