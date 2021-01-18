import { Button } from "react-bootstrap";
import React from "react";
import "./mini_line_view.css";

function MiniLineView(props) {
  const { store, active, length } = props.data;

  return (
    <div className="mini-line-view my-2 p-2">
      <div>
        <p className="store-title mb-1">{store}</p>
        <p className="mb-1">
          status: <span className={active ? "green" : "red"}>{active ? "active" : "inactive"}</span>
        </p>
        <p className="mb-1">
          queue length: <span>{length}</span>
        </p>
      </div>
      <Button className="manage-line-btn">Manage</Button>
    </div>
  );
}

export default MiniLineView;