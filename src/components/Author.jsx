import React from "react";

const Author = (props) => {
  return (
    <footer className=" text-white text-center py-4 w-full h-28 flex items-center justify-center">
      <p className="text-xl">
        Created by{" "}
        <a
          href="https://www.linkedin.com/in/klinton-thapa-8a629b323/"
          className=" underline"
          target="__blank"
        >
          Klinton Thapa{" "}
        </a>
      </p>
    </footer>
  );
};

export default Author;
