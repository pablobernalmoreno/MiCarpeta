import React, { useState } from "react";
import config from "../auth/firebaseConfig";

function SignUp(props) {
  const [userName, setUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleName = (event) => {
    setUserName(event.target.value);
    setNewEmail(createEmail(userName));
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const createEmail = (name) => {
    return `${name.replace(/\s+/g, "").substr(0, 7)}${Math.floor(
      Math.random() * 10
    )}@operadorBCQ.com`;
  };

  const handleClickNewUser = () => {
    config
      .auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then((user) => {
        props.history.push("/Home");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
      });
  };

  const handleToLogin = () => {
    props.history.push("/");
  };

  console.log(newEmail);

  return (
    <div>
      <h1>SignUp</h1>
      <h2>Cuenta nueva</h2>
      <input type="text" placeholder="Nombre" onChange={handleName} />
      <input
        type="text"
        placeholder="Contraseña nueva"
        onChange={handleNewPassword}
      />
      <button onClick={handleClickNewUser}>New User</button>
      <button onClick={handleToLogin}>Login</button>
    </div>
  );
}

export default SignUp;
