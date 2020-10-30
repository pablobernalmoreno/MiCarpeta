import React, { useState } from "react";
import config from "../auth/firebaseConfig";

function Login(props) {
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleOldEmail = (event) => {
    setOldEmail(event.target.value);
  };

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleClickLogin = () => {
    config
      .auth()
      .signInWithEmailAndPassword(oldEmail, oldPassword)
      .then((user) => {
        props.history.push("/Home");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
      });
  };

  const handleToRegister = () => {
    props.history.push("/SignUp");
  };

  return (
    <div>
      <h1>Login</h1>
      <h2>Cuenta vieja</h2>
      <input type="text" placeholder="Correo viejo" onChange={handleOldEmail} />
      <input
        type="text"
        placeholder="Contraseña vieja"
        onChange={handleOldPassword}
      />
      <button onClick={handleClickLogin}>Old User</button>
      <button onClick={handleToRegister}>Register</button>
    </div>
  );
}

export default Login;
