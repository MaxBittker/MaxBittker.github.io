import React from "react";
import Favicon from "./favicon.js";
import Wrap from "./Wrap.jsx";

let linkStyle = {
  color: "black",
  textDecoration: "none",
  padding: "0px  3px",
  position: "relative",
  zIndex: 100,
  textShadow: `
  -1px -1px  #f4eeef,
   1px -1px  #f4eeef,
   -1px 1px  #f4eeef,
  1px 1px  #f4eeef,
  -2px -2px  #f4eeef,
   2px -2px  #f4eeef,
   -2px 2px  #f4eeef,
  2px 2px  #f4eeef`,
};

const Header = () => {
  if (typeof window != "undefined") {
    window.l = 9;
  }
  Favicon();

  return (
    <div className="header">
      <Wrap n={3} pack>
        <a href={"/"} style={linkStyle}>
          max bittker
        </a>
      </Wrap>

      <Wrap n={3} pack>
        <a href={"/projects/"} style={linkStyle}>
          projects
        </a>
      </Wrap>
      <Wrap n={3} pack>
        <a href={"/blog/"} style={linkStyle}>
          blog
        </a>
      </Wrap>
      <Wrap n={3} pack>
        <a href={"/roll/"} style={linkStyle}>
          roll
        </a>
      </Wrap>
      <Wrap n={3} pack>
        <a href={"/bookshelf/"} style={linkStyle}>
          shelf
        </a>
      </Wrap>
    </div>
  );
};

export default Header;
