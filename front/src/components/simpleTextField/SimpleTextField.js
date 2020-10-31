import React from "react";
import TextField from "@material-ui/core/TextField";
import "./SimpleTextField.css";

export default function SimpleTextField(props) {
  return (
    <div>
      <TextField
        className="simpleTextField"
        value={props.value}
        label={props.title}
        onChange={props.onChange}
        error={props.error}
        helperText={props.helperText}
        type={props.type}
        variant={props.variant}
      />
    </div>
  );
}
