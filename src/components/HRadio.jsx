import React from "react";

let checkedradio;

const HRadio = ({ n, flip, type }) => {
  if (typeof window !== "undefined") {
    if (window.matchMedia("(max-width: 700px)").matches) {
      n = n / 3.1;
    }
  }
  let array = Array.from(Array(Math.floor(n)).keys());

  return (
    <div
      className="hradio"
      aria-hidden="true"
      style={{
        flexWrap: flip ? "wrap-reverse" : "wrap",
      }}
    >
      {array.map((i) => (
        <input
          key={i}
          type={type ? type : "radio"}
          defaultChecked={i % 2}
          tabIndex="-1"
          onClick={(e) => {
            let thisradio = e.target;
            if (checkedradio === thisradio) {
              thisradio.checked = false;
              checkedradio = null;
            } else {
              checkedradio = thisradio;
            }
          }}
        />
      ))}
    </div>
  );
};

export default HRadio;
