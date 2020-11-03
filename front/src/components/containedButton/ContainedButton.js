import React from "react";
import Button from "@material-ui/core/Button";
import "./ContainedButton.css";

export default function ContainedButton(props) {
  return (
    <div>
      <Button
        className="containedButton"
        variant="contained"
        color="primary"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.title}
      </Button>
    </div>
  );
}
