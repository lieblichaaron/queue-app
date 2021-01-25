import React from "react";
import MiniLineView from "../mini_line_view/MiniLineView";

function LineList(props) {
  const lines = props.lines.map((line) => (
    <MiniLineView key={line.storeName} data={line} />
  ));
  return (
    <div className="container">
      {lines.length > 0 ? (
        lines
      ) : (
        <p className="text-center">You do not have any lines.</p>
      )}
    </div>
  );
}

export default LineList;
