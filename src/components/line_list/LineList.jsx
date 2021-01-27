import React from "react";
import MiniLineView from "../mini_line_view/MiniLineView";

function LineList(props) {
  let lines;
  if (props.lines) {
    lines = props.lines.map((line) => (
      <MiniLineView key={line.storeName} data={line} />
    ));
  }

  return (
    <div className="container">
      {Array.isArray(props.lines) && lines.length > 0 ? (
        lines
      ) : lines ? (
        <p className="text-center">You do not have any lines.</p>
      ) : (
        <p className="text-center">Server is unavailable.</p>
      )}
    </div>
  );
}

export default LineList;
