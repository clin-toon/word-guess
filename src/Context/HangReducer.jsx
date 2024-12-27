export const contextReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_WORD":
      return {
        ...state,
        mainWord: payload.mainWord,
        spacesWord: payload.spacesWord,
      };

    case "ADD_LETTERS":
      return {
        ...state,
        enteredLetter: payload,
      };

    case "UPDATE_SPACES_WORD":
      return {
        ...state,
        spacesWord: payload,
      };

    case "DECREASE_COUNT":
      return {
        ...state,
        guessesLeft: payload,
      };

    case "SET_SPACES_COUNT":
      return {
        ...state,
        totalSpaces: payload,
      };

    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: payload,
      };

    case "SET_HINT":
      return {
        ...state,
        hint: payload,
      };

    case "INCREASE_GAME_WON":
      return {
        ...state,
        gameWon: state.gameWon + 1,
        totalGamesPlayed: state.totalGamesPlayed + 1,
      };

    case "INCREASE_GAME_LOST":
      return {
        ...state,
        gameLost: state.gameLost + 1,
        totalGamesPlayed: state.totalGamesPlayed + 1,
      };

    case "SET_SPACES_FILLED":
      return {
        ...state,
        spacesFilled: payload,
      };

    case "INCREASE_SPACES_FILLED":
      return {
        ...state,
        spacesFilled: payload,
      };

    case "WON":
      return {
        ...state,
        gameStatus: "win",
        totalGamesPlayed: state.totalGamesPlayed + 1,
        gamesWon: state.gamesWon + 1,
      };

    case "LOST":
      return {
        ...state,
        gameStatus: "lost",
        totalGamesPlayed: state.totalGamesPlayed + 1,
        gamesLost: state.gamesLost + 1,
      };

    case "SHOW_MODAL":
      return {
        ...state,
        displayModal: true,
      };

    case "START_GAME":
      return {
        ...state,
        startGame: true,
      };

    case "MAIN_MENU":
      return {
        ...state,
        startGame: false,
      };

    case "RESET":
      return {
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
        gameReset: !state.gameReset,
        startGame: true,
        difficulty: payload,
        error: false,
        totalGamesPlayed: state.totalGamesPlayed,
        gamesLost: state.gamesLost,
        gamesWon: state.gamesWon,
      };

    case "SET_ERROR_TRUE":
      return {
        ...state,
        error: true,
      };

    case "SET":
      return {
        ...state,
        word: payload,
      };

    default:
      return state;
  }
};
