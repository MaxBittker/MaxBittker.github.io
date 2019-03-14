import React from "react";
import createReactClass from "create-react-class";
// import { shuffle } from "lodash";

function sums(values) {
  let acc = 0;
  let sums = [acc];
  values.forEach(v => {
    acc += v;
    sums.push(acc);
  });
  return sums;
}

function make_row(w) {
  let raw = Array.from(Array((1 + Math.random() * 8) | 0).keys()).map(() =>
    Math.random()
  );
  let sum = raw.reduce((a, b) => a + b);
  let vs = raw.map(r => u * Math.ceil(r * (w / u / sum)));

  return vs;
}
let u = 5;
let rowHeight = u * 15;

const Loom = createReactClass({
  getInitialState() {
    return { mounted: false };
  },
  componentDidMount() {
    this.setState({ mounted: true });
  },
  render() {
    let height = 2000;
    let width = 2000;
    if (typeof window !== "undefined") {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    if (!this.state.mounted) {
      return <div />;
    }
    let rows = Array.from(Array((1 + height / rowHeight) | 0).keys()).map(() =>
      make_row(width / u)
    );
    let u2 = u - Math.random() * 3;
    // let m = 1;
    return (
      <svg className="loom">
        <pattern id="hatch" patternUnits="userSpaceOnUse" width={u} height={u}>
          <path
            d={`
           M-1,1 l2,-2
           M0,${u} l${u},-${u}
           M${u2 - 1},${u2 + 1} l2,-2`}
          />
        </pattern>
        <pattern
          id="left-hatch"
          patternUnits="userSpaceOnUse"
          width={u}
          height={u}
        >
          <path
            d={`
           M${u2 - 1},-1 l2,2
           M-1,-1 l${u + 1},${u + 1}
           M-1,${u2 - 1} l2,2`}
          />
        </pattern>

        {rows.map((row, r) => {
          let row_sums = sums(row);
          return row.map((w, c) => (
            <rect
              key={`${r}+${c}`}
              x={row_sums[c] * u}
              y={r * rowHeight}
              width={w * u}
              height={rowHeight}
              fill={`url(#${Math.random() > 0.5 ? "hatch" : "left-hatch"})`}
              style={{ stroke: "none" }}
            />
          ));
        })}
      </svg>
    );
  }
});
export default Loom;
