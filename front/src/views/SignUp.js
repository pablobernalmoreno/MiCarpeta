import React, { useState } from "react";
import axios from "axios";
import config from "../auth/firebaseConfig";

function SignUp(props) {
  const [identification, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAdress] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handelAddress = (event) => {
    setAdress(event.target.value);
  };

  const handleClickNewUser = () => {
    const citizen = {
      id: identification,
      name: userName,
      address: address,
      email: newEmail,
      operatorId: 377,
      operatorName: "OperadorBCQ",
    };

    console.log(citizen);
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
          .createUserWithEmailAndPassword(newEmail, newPassword)
          .then((user) => {
            props.history.push("/Home");
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, " ", errorMessage);
          });
      })
      .catch((error) => {
        console.error("There was an error: ", error.message);
      });
  };

  const handleToLogin = () => {
    props.history.push("/");
  };

  return (
    <div>
      <h1>SignUp</h1>
      <h2>Cuenta nueva</h2>
      <input type="text" placeholder="Nombre" onChange={handleName} />
      <input type="text" placeholder="Identificación" onChange={handleId} />
      <input
        type="text"
        placeholder="Dirección de hogar"
        onChange={handelAddress}
      />
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
