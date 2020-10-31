import React, { useState } from "react";
import config from "../../auth/firebaseConfig";
import ContainedButton from "../../components/containedButton/ContainedButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./Home.css";

function Home(props) {
  const [userEmail, setUserEmail] = useState("");
  const [open, setOpen] = useState(
    localStorage.getItem("firstTime") !== null ? true : false
  );

  console.log(typeof localStorage.getItem("firstTime"));
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSignOut = () => {
    localStorage.clear();
    config
      .auth()
      .signOut()
      .then((user) => {
        props.history.push("/");
      })
      .catch((error) => {});
  };

  config.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUserEmail(user.email);
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Aviso Importante</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tu cuenta para acceder a los servicios de este u otro operador es la
            siguiente:{userEmail} <br /> Por favor no la olvides junto a tu
            contraseña!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ContainedButton onClick={handleClose} title="Cerrar" />
        </DialogActions>
      </Dialog>
      <div className="homeHeader">
        <h1>BCQ</h1>
        <h2>Bienvenido {userEmail}</h2>
        <div className="signOutContainer">
          <ContainedButton onClick={handleClickSignOut} title="Sign Out" />
        </div>
      </div>
    </div>
  );
}

export default Home;
