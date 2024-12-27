import React, { useContext } from "react";
import { HangContext } from "../Context/HangContext";

const GameInfo = (props) => {
  const { state } = useContext(HangContext);
  const { totalGamesPlayed, gamesWon, gamesLost } = state;
  return (
    <div className="text-white shadow-lg">
      <p>
        Games Played : <span>{totalGamesPlayed}</span>
      </p>
      <p>
        Games Won : <span>{gamesWon}</span>
      </p>
      <p>
        Games Lost : <span>{gamesLost}</span>
      </p>
    </div>
  );
};

export default GameInfo;
