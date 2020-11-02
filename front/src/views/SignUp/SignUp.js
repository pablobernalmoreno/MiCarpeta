import React, { useState } from "react";
import axios from "axios";
import config from "../../auth/firebaseConfig";
import SimpleTextField from "../../components/simpleTextField/SimpleTextField";
import ContainedButton from "../../components/containedButton/ContainedButton";
import TextButton from "../../components/textButton/TextButton";

import "./SignUp.css";

function SignUp(props) {
  const [identification, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAdress] = useState("");
  const [newEmail, setNewEmail] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setError] = useState(false);

  const createEmail = (name) => {
    return `${name.replace(/\s+/g, "").substr(0, 7)}${Math.floor(
      Math.random() * 10
    )}@operadorBCQ.com`;
  };

  const handleId = (event) => {
    setId(event.target.value);
  };

  const handleName = (event) => {
    setUserName(event.target.value);
    setNewEmail(createEmail(userName));
  };

  // const handleNewPassword = (event) => {
  //   setNewPassword(event.target.value);
  // };

  const handelAddress = (event) => {
    setAdress(event.target.value);
  };

  const handleClickNewUser = () => {
    localStorage.setItem("firstTime", true);
    axios({
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      method: "POST",
      url: "https://govcarpetaapp.mybluemix.net/apis/registerCitizen",
      data: {
        id: identification,
        name: userName,
        address: address,
        email: newEmail,
        operatorId: 377,
        operatorName: "OperadorBCQ",
      },
    })
      .then(() => {
        config
          .auth()
          .createUserWithEmailAndPassword(newEmail, identification)
          .then((user) => {
            const currentUser = config.auth().currentUser;

            currentUser
              .updateProfile({
                displayName: identification,
              })
              .then(function () {})
              .catch(function (error) {});
            props.history.push("/Home");
          })
          .catch(function (error) {
            var errCode = error.code;
            var errMessage = error.message;
            setError(true);
            setErrorMessage(`${errCode} ${errMessage}`);
            console.log(errorMessage);
          });
      })
      .catch((error) => {
        axios({
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
          method: "GET",
          url: `https://govcarpetaapp.mybluemix.net/apis/validateCitizen/${identification}`,
        })
          .then((response) => {
            setError(true);
            setErrorMessage(
              response.data
                ? `Hubo un error: ${response.data}`
                : "Hubo un error inesperado, intenta otra vez!"
            );
          })
          .catch((error) => {
            setError(true);
            setErrorMessage("Hubo un error inesperado, intenta otra vez!");
          });
      });
  };

  const handleToLogin = () => {
    props.history.push("/");
  };

  return (
    <div className="signupContainer">
      <div className="formContainerSignUp">
        <div className="title">
          <h1>Operador BCQ</h1>
          <h2>Registro</h2>
        </div>
        <div className="textfieldSignUp">
          <SimpleTextField
            title="Nombre*"
            onChange={handleName}
            variant="outlined"
            type="text"
            error={isError}
            helperText={errorMessage}
          />
        </div>
        <div className="textfieldSignUp">
          <SimpleTextField
            title="Identificación*"
            onChange={handleId}
            variant="outlined"
            type="text"
          />
        </div>
        <div className="textfieldSignUp">
          <SimpleTextField
            title="Dirección de vivienda*"
            onChange={handelAddress}
            variant="outlined"
            type="text"
          />
        </div>
        {/* <div className="textfieldSignUp">
          <SimpleTextField
            title="Contraseña*"
            onChange={handleNewPassword}
            variant="outlined"
            type="password"
          />
        </div> */}
        <div className="buttonSignUp">
          <ContainedButton onClick={handleClickNewUser} title="Register" />
        </div>
        <div className="buttonSignUp">
          <TextButton onClick={handleToLogin} title="Inicia Sesión" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
