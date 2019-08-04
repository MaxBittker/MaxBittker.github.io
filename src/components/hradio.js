import React from "react";
import createReactClass from "create-react-class";

var checkedradio;

const HRadio = createReactClass({
  render() {
    let { n, flip, type } = this.props;
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
            type={type ? type : "radio"}
            defaultChecked={i % 2}
            onClick={e => {
              let thisradio = e.target;
              // if (thisradio.defaultChecked) {
              //   checkedradio = thisradio;
              // }
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
