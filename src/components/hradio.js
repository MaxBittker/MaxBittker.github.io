import React from "react";
import createReactClass from "create-react-class";

let cursors = [
  "context-menu",
  "help",
  "pointer",
  "progress",
  "wait",
  "cell",
  "crosshair",
  "text",
  "vertical-text",
  "alias",
  "copy",
  "move",
  "no-drop",
  "not-allowed",
  "e-resize",
  "n-resize",
  "ne-resize",
  "nw-resize",
  "s-resize",
  "se-resize",
  "sw-resize",
  "w-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "col-resize",
  "row-resize",
  "all-scroll",
  "zoom-in",
  "zoom-out",
  "grab",
  "grabbing"
];
var checkedradio;

const HRadio = createReactClass({
  render() {
    let { n, flip } = this.props;
    let array = Array.from(Array(n).keys());
    return (
      <div
        className="hradio"
        aria-hidden="true"
        style={{
          flexWrap: flip ? "wrap-reverse" : "wrap"
        }}
      >
        {array.map(i => (
          <input
            key={i}
            type="radio"
            defaultChecked={i % 2}
            onClick={e => {
              let thisradio = e.target;
              if (checkedradio === thisradio) {
                thisradio.checked = false;
                checkedradio = null;
              } else {
                checkedradio = thisradio;
              }
            }}
            style={
              {
                // cursor: cursors[i % cursors.length]
              }
            }
          />
        ))}
      </div>
    );
  }
});
export default HRadio;
