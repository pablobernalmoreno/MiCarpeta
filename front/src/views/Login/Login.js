import React, { useState } from "react";
import config from "../../auth/firebaseConfig";
import SimpleTextField from "../../components/simpleTextField/SimpleTextField";
import ContainedButton from "../../components/containedButton/ContainedButton";
import TextButton from "../../components/textButton/TextButton";
import "./Login.css";

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
          props.history.push({
              pathname: '/Home',
              state: { email: user.user.email, id: user.user.displayName }
            })
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
    <div className="loginContainer">
      <div className="formContainer">
        <div className="title">
          <h1>Operador BCQ</h1>
          <h2>Inicio Sesión</h2>
        </div>
        <div className="textfield">
          <SimpleTextField
            title="Correo*"
            onChange={handleOldEmail}
            type="text"
            variant="outlined"
          />
        </div>
        <div className="textfield">
          <SimpleTextField
            title="Contraseña*"
            onChange={handleOldPassword}
            type="password"
            variant="outlined"
          />
        </div>
        <div className="button">
          <ContainedButton onClick={handleClickLogin} title="Login" />
        </div>
        <div className="button">
          <TextButton onClick={handleToRegister} title="Registrate!" />
        </div>
      </div>
    </div>
  );
}

export default Login;
