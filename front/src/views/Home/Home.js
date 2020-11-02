import React, { useState } from "react";
import { imagestorage, urlstorage } from "../../auth/firebaseConfig";
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
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [documents, setDocuments] = useState([]);

  let thingsRef;

  config.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUserEmail(user.email);
      setUserId(user.displayName);
      if (userId?.length > 0) {
        thingsRef = urlstorage.collection("userURL").doc(userId);
      }
    }
  });

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = imagestorage
      .ref(`${userEmail}/${image?.name}`)
      .put(image);
    console.log(uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {},
      () => {
        imagestorage
          .ref(userEmail)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            createDoc();
          });
      }
    );
  };

  const createDoc = () => {
    thingsRef.set({
      name: "Titulo",
      url: url,
      uid: userId,
      createdAt: Date.now(),
    });
  };

  const showDocs = () => {
    thingsRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setDocuments([...documents, doc.data()]);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  console.log(documents);

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
            siguiente:{userEmail} <br /> Con esta y con tu identificación como
            contraseña puedes ingresar. <br /> Por favor no lo olvides!
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
      <div>
        <progress value={progress} max="100" />

        <br />
        <input type="file" onChange={handleChange} />
        <ContainedButton onClick={handleUpload} title="upload" />
        <ContainedButton onClick={showDocs} title="Show docs" />
        {documents.map((document) => {
          return <a href={document.url}>{document.name}</a>;
        })}
      </div>
    </div>
  );
}

export default Home;
