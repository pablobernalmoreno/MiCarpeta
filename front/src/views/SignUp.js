import React, { useState } from "react";
import config from "../auth/firebaseConfig";

function SignUp(props) {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNewEmail = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleClickNewUser = () => {
    config
      .auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .then((user) => {
        props.history.push('/Home');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
      });
  };
  return (
    <div>
      <h1>SignUp</h1>
      <h2>Cuenta nueva</h2>
      <input type="text" placeholder="Correo nuevo" onChange={handleNewEmail} />
      <input
        type="text"
        placeholder="Contraseña nueva"
        onChange={handleNewPassword}
      />
      <button onClick={handleClickNewUser}>New User</button>
    </div>
  );
}

export default SignUp;
