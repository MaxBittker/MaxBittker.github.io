import React from "react";

const Wrap = ({ n, children, fill, pack }) => {
  let cn = "b-wrap";
  if (fill) cn += " fill";
  if (pack) cn += " pack";

  if (n === 0) {
    return <div className={cn}>{children}</div>;
  }
  return (
    <div className={cn}>
      <Wrap n={n - 1} fill={fill}>
        {children}
      </Wrap>
    </div>
  );
};

export default Wrap;
