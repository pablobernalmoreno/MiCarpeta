import "./App.css";
import React, { useState } from "react";
import config from "./auth/firebaseConfig";

function App() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleNewEmail = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleOldEmail = (event) => {
    setOldEmail(event.target.value);
  };

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  const handleClickNewUser = () => {
    config
      .auth()
      .createUserWithEmailAndPassword(newEmail, newPassword)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
        // ...
      });
  };

  const handleClickSignOut = () => {
    config
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const handleClickLogin = () => {
    config
      .auth()
      .signInWithEmailAndPassword(oldEmail, oldPassword)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, " ", errorMessage);
      });
  };

  console.log(config.auth().currentUser);
  return (
    <div className="App">
      <button onClick={handleClickSignOut}>Sign Out</button>
      <h1>Cuenta nueva</h1>
      <input type="text" placeholder="Correo nuevo" onChange={handleNewEmail} />
      <input
        type="text"
        placeholder="Contraseña nueva"
        onChange={handleNewPassword}
      />
      <button onClick={handleClickNewUser}>New User</button>
      <h1>Cuenta vieja</h1>
      <input type="text" placeholder="Correo viejo" onChange={handleOldEmail} />
      <input
        type="text"
        placeholder="Contraseña vieja"
        onChange={handleOldPassword}
      />
      <button onClick={handleClickLogin}>Old User</button>
    </div>
  );
}

export default App;
