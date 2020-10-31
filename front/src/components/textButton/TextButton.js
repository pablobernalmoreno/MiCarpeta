import React from "react";
import Button from "@material-ui/core/Button";
import "./TextButton.css";

export default function TextButton(props) {
  return (
    <div>
      <Button className="textButton" onClick={props.onClick} color="primary">
        {props.title}
      </Button>
    </div>
  );
}
