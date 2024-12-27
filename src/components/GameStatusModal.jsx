import React, { useContext, useEffect } from "react";
import { HangContext } from "../Context/HangContext";

const GameStatusModal = (props) => {
  const { state, dispatch } = useContext(HangContext);
  const { gameStatus, totalGamesPlayed, gamesWon, gamesLost } = state;
  const { word, difficulty } = state;

  const handlePlayAgain = () => {
    dispatch({ type: "RESET", payload: difficulty });
  };

  const goToMainMenu = () => {
    dispatch({ type: "RESET", payload: difficulty });
    dispatch({ type: "MAIN_MENU" });
  };

  return (
    <div
      className="fixed inset-0 bg-white
     bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {gameStatus === "win"
            ? "🎉 You Won!"
            : `😢 You Lost! Word was ${word}. `}
        </h2>

        <div className=" mt-2 mb-4 ">
          <h3 className="text-xl font-medium mt-1">
            {" "}
            Games Played :{" "}
            <span className="font-bold ">{totalGamesPlayed}</span>
          </h3>
          <h3 className="text-xl font-medium mt-1">
            {" "}
            Games Won : <span className="font-bold ">{gamesWon}</span>
          </h3>
          <h3 className="text-xl font-medium mt-1">
            {" "}
            Games Lost : <span className="font-bold ">{gamesLost}</span>
          </h3>
        </div>
        <button
          onClick={handlePlayAgain}
          className="bg-green-500 mx-10 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Play Again
        </button>

        <button
          onClick={goToMainMenu}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameStatusModal;
