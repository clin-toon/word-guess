import Inputs from "./components/Inputs";
import WordGuess from "./components/WordGuess";
import { useContext } from "react";
import { HangContext } from "./Context/HangContext";
import GuessCount from "./components/GuessCount";
import "react-toastify/dist/ReactToastify.css";
import GameStatusModal from "./components/GameStatusModal";
import Author from "./components/Author";
import HomeScreen from "./components/HomeScreen";

function App() {
  const { state } = useContext(HangContext);
  const { startGame, hint, difficulty, error } = state;

  return (
    <>
      {startGame ? (
        <div className="flex items-center justify-center">
          <div className="bg-[url('/bgg.jpg')]  h-screen relative flex items-center flex-col p-3 rounded-md  ">
            <h1 className="text-white text-center py-10 font-bold  text-3xl">
              Guessing words{" "}
            </h1>
            {state.displayModal && <GameStatusModal />}
            {/* <GameStatusModal /> */}
            <div>{/* <GameInfo /> */}</div>
            <div className="mt-3">
              <GuessCount />
            </div>
            {difficulty === "easy" && (
              <span className="font-bold text-white mt-5 text-2xl">
                Hint : {hint}
              </span>
            )}

            <span className="font-bold text-white mt-5 text-xl">
              Difficulty : {difficulty}
            </span>

            <div className="mt-6 ">
              {error ? (
                <span className="text-white text-xl">
                  Failed to load word.<br></br> Check your internet connection.{" "}
                </span>
              ) : (
                <WordGuess />
              )}
            </div>
            <div className="w-96 shadow-lg mt-12">
              <Inputs />
            </div>
            <div className="fixed bottom-0 ">
              <Author />
            </div>
          </div>
        </div>
      ) : (
        <HomeScreen />
      )}
    </>
  );
}

export default App;
