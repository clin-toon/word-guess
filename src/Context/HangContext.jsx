import { createContext, useReducer } from "react";
import { contextReducer } from "./HangReducer";
import { toast } from "react-toastify";

const INITIAL_STATE = {
  word: null,
  mainWord: [],
  spacesWord: [],
  enteredLetter: [],
  guessesLeft: 5,
  totalSpaces: null,
  spacesFilled: 0,
  gameStatus: null,
  correctGuess: null,
  wrongGuess: null,
  dispalyModal: false,
  gameReset: false,
  totalGamesPlayed: 0,
  gamesWon: 0,
  gamesLost: 0,
  difficulty: "easy",
  startGame: false,
  error: false,
};

export const HangContext = createContext(INITIAL_STATE);

export const HangContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contextReducer, INITIAL_STATE);
  const {
    mainWord,
    spacesWord,
    enteredLetter,
    spacesFilled,
    totalSpaces,
    guessesLeft,
    gameReset,
    startGame,
    difficulty,
    totalGamesPlayed,
    gamesWon,
    gamesLost,
  } = state;

  // function to decide which api to call and call main api calling function

  const decideAPICall = () => {
    let apiUrl;
    let ranNum = Math.floor(Math.random() * 3);

    if (difficulty === "hard") {
      apiUrl = "https://random-word-api.herokuapp.com/word";
      return fetchSingleWord(apiUrl);
    }

    if (ranNum === 0) {
      apiUrl = "https://random-word-form.herokuapp.com/random/animal";
      dispatch({ type: "SET_HINT", payload: "Animal" });
    } else if (ranNum === 1) {
      apiUrl = "https://random-word-form.herokuapp.com/random/noun";
      dispatch({ type: "SET_HINT", payload: "Noun" });
    } else if (ranNum === 2) {
      apiUrl = "https://random-word-form.herokuapp.com/random/adjective";
      dispatch({ type: "SET_HINT", payload: "Adjective" });
    }
    //
    fetchSingleWord(apiUrl);
  };

  // fetching word from external api
  const fetchSingleWord = async (url) => {
    try {
      const res = await fetch(url);
      const word = await res.json();
      const hangManWord = word[0];
      dispatch({ type: "SET", payload: hangManWord });
      const arr = hangManWord.split("");
      let spacesWord = createEmptySpaces(arr);
      dispatch({
        type: "SET_WORD",
        payload: { mainWord: arr, spacesWord: spacesWord },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR_TRUE" });
    }
  };

  const createEmptySpaces = (word) => {
    let length = word.length;
    let maxSpaces = getMaxSpaces(length);
    let newArr = [...word];
    let uniqueNumArr = [];
    // creating random spaces withing the word

    for (let index = 0; index < maxSpaces; index++) {
      let ranNum = Math.floor(Math.random() * length);
      if (uniqueNumArr.indexOf(ranNum) === -1) {
        uniqueNumArr.push(ranNum);
      }
      newArr[ranNum] = "_";
    }
    if (uniqueNumArr.length > 0) {
      dispatch({ type: "SET_SPACES_COUNT", payload: uniqueNumArr.length });
      return newArr;
    } else {
      dispatch({ type: "RESET", payload: difficulty });
      return [];
    }
  };

  const getMaxSpaces = (length) => {
    let count;
    if (length < 5) {
      count = 2;
    } else if (length <= 10 && length >= 5) {
      count = 4;
    }
    return count;
  };

  // function to add inputed letters by user in an array
  const addEnteredLetter = (letter) => {
    let newArr = [...enteredLetter, letter];
    dispatch({ type: "ADD_LETTERS", payload: newArr });
  };

  // function to decrease guess counts if the entered letter is wrong
  const decreaseGuess = () => {
    const audio = new Audio("/lose.mp3");
    audio.play();
    const count = state.guessesLeft - 1;
    dispatch({ type: "DECREASE_COUNT", payload: count });
    toast.error("Wrong letter");
    checkForWinOrLoss(spacesFilled, count);
  };

  // function to replace letters according to user input
  const replaceLetters = (letter) => {
    for (let i = 0; i < mainWord.length; i++) {
      if (spacesWord[i] === "_") {
        if (mainWord[i] === letter) {
          let newArr = [...spacesWord];
          newArr[i] = letter;
          dispatch({ type: "UPDATE_SPACES_WORD", payload: newArr });
          let space = spacesFilled + 1; // increasing spaces filled state for win logic
          dispatch({ type: "INCREASE_SPACES_FILLED", payload: space });
          const audio = new Audio("/correct.wav");
          audio.play();
          toast.success("Absolutely correct");
          checkForWinOrLoss(space, guessesLeft);
          return;
        }
      }
    }
    // calling decrease guess count function to decrease the guess count if the letter is wrong
    decreaseGuess();
  };

  // check the status of game won or lose and play sound according
  const checkForWinOrLoss = (space, guess) => {
    if (space === totalSpaces && guess > 0) {
      dispatch({
        type: "WON",
      });
      const audio = new Audio("/won_game.wav");
      audio.play();

      // pausing sound after 3 seconds
      setTimeout(() => {
        audio.pause();
      }, 3000);
      return dispatch({ type: "SHOW_MODAL" });
    }

    if (space < totalSpaces && guess === 0) {
      dispatch({
        type: "LOST",
      });
      const audio = new Audio("/game_lost.mp3");
      audio.play();
      return dispatch({ type: "SHOW_MODAL" });
    }
  };

  return (
    <HangContext.Provider
      value={{
        state,
        dispatch,
        replaceLetters,
        addEnteredLetter,
        checkForWinOrLoss,
        fetchSingleWord,
        gameReset,
        startGame,
        decideAPICall,
        totalGamesPlayed,
        gamesWon,
        gamesLost,
      }}
    >
      {children}
    </HangContext.Provider>
  );
};
