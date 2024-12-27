import React, { useContext, useEffect, useState } from "react";
import { HangContext } from "../Context/HangContext";

const HomeScreen = (props) => {
  const audio = new Audio("/intro.mp3");
  const [selectDifficulty, setSelectDifficulty] = useState(0);
  const { dispatch } = useContext(HangContext);
  const [showMute, setShowMute] = useState(true);
  const handleDifficultySelection = (val) => {
    if (val === 0) {
      setSelectDifficulty(0);
      dispatch({ type: "SET_DIFFICULTY", payload: "easy" });
    } else if (val === 1) {
      setSelectDifficulty(1);
      dispatch({ type: "SET_DIFFICULTY", payload: "medium" });
    } else if (val === 2) {
      setSelectDifficulty(2);
      dispatch({ type: "SET_DIFFICULTY", payload: "hard" });
    }
  };

  const startGame = () => {
    handleIntroPlay("pause");
    dispatch({ type: "START_GAME" });
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, []);

  const handleIntroPlay = (task) => {
    if (task === "play") {
      audio.play();
    } else if (task === "pause") {
      audio.pause();
    }
  };

  const handlePlayMusic = () => {
    handleIntroPlay("play");
    setShowMute(false);
  };

  return (
    <div className="relative  h-screen overflow-hidden ">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/bgg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Over Video */}

      <div className="relative z-10 flex items-center justify-center h-full flex-col">
        <div className="my-10">
          {showMute ? (
            <i
              className="fas fa-volume-mute text-3xl text-white cursor-pointer "
              onClick={handlePlayMusic}
            ></i>
          ) : (
            <i className="fa-solid fa-volume-high text-3xl text-white cursor-not-allowed"></i>
          )}
          <span className="text-white font-bold text-3xl  mx-3">
            Word Guess Game
          </span>
        </div>
        <div className="flex flex-col sm:block">
          <button
            onClick={() => handleDifficultySelection(0)}
            className={`mx-6 relative px-6 py-3 text-lg font-bold text-white ${
              selectDifficulty === 0 ? "bg-green-400" : "bg-green-900"
            } rounded-md shadow-lg hover:bg-green-700 mt-3`}
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultySelection(1)}
            className={`mx-6 relative px-6 py-3 text-lg font-bold text-white  ${
              selectDifficulty === 1 ? "bg-green-400" : "bg-green-900"
            } rounded-md shadow-lg hover:bg-green-700 mt-3`}
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultySelection(2)}
            className={`mx-6 relative px-6 py-3 text-lg font-bold text-white  ${
              selectDifficulty === 2 ? "bg-green-400" : "bg-green-900"
            } rounded-md shadow-lg hover:bg-green-700 mt-3`}
          >
            Hard{" "}
          </button>
        </div>

        <h1 className="text-white text-4xl font-bold my-10">
          <button
            onClick={startGame}
            className="relative px-6 py-3 text-lg font-bold text-white bg-green-600 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 animate-pulse"
            style={{ width: "100%", height: "100%" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-600 rounded-md opacity-50 animate-ping"></span>
            <span className="relative">Play </span>
          </button>
        </h1>
      </div>

      {/* Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
    </div>
  );
};

export default HomeScreen;
