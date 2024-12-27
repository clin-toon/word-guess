import React, { useState } from "react";

const LevelDropDown = () => {
  const [levelValue, setLevelValue] = useState("easy");

  const handleLevelChange = (e) => {
    setLevelValue(e.target.value);
  };
  const startGame = (e) => {
    e.preventDefault();
    console.log(levelValue);
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center flex-col">
      <div className="bg-slate-50 shadow-sm rounded-sm p-4 h-96 w-96 flex flex-col items-center justify-center">
        <form action="" className="flex flex-col" onSubmit={startGame}>
          <label htmlFor="levelDropdown" className="text-2xl my-4 font-bold">
            Choose Difficulty Level
          </label>
          <select
            name="level"
            id="levelDropdown"
            className="m-2 bg-slate-100 h-10"
            onChange={handleLevelChange}
            value={levelValue}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button className="bg-blue-500 text-white p-2 border-none rounded-md mt-10 hover:bg-blue-700">
            Start game{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LevelDropDown;
