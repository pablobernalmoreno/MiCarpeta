import React, { Component, useState } from "react";
import { imagestorage, urlstorage } from "../../auth/firebaseConfig";
import config from "../../auth/firebaseConfig";
import ContainedButton from "../../components/containedButton/ContainedButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./Home.css";
import { Button, Container } from "@material-ui/core";
import Header from "../../components/header/Header";
import axios from "axios"
import { ReactTinyLink } from 'react-tiny-link'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      open: false,
      userId: null,
      image: null,
      url: "",
      progress: 0,
      documents: [],
      fileUploaded: false,
      thingsRef: null
    }
  }

  componentDidMount() {
    if (localStorage.getItem("firstTime") !== null) {
      this.setState({ open: true })
    }
    this.setState({ userEmail: this.props.location.state.email, userId: this.props.location.state.id })
    this.showDocs();
  }

  handleClickSignOut = () => {
    localStorage.clear();
    config
      .auth()
      .signOut()
      .then((user) => {
        this.props.history.push("/");
      })
      .catch((error) => { });
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      this.setState({ image: e.target.files[0], fileUploaded: true })
    }
  };


  handleUpload = () => {
    const uploadTask = imagestorage
      .ref(`${this.state.userEmail}/${this.state.image?.name}`)
      .put(this.state.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress: progress })
      },
      (error) => { },
      () => {
        imagestorage
          .ref(this.state.userEmail)
          .child(this.state.image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url: url })
            let userData = {
              name: this.state.image.name,
              url: url,
              autenticado: false
            }
            alert("Subido con éxito");
            axios
              .post("https://micarpeta-b07f1.firebaseio.com/users/" + this.state.userId + "/documents.json", userData)
              .then(res => {
                console.log(res);
                this.showDocs();
              })
              .catch(err =>
                console.log(err)
              );

          });
      }
    );
  };

  validarDocumento = (id, url, title, index, docid) => {
    let documents = this.state.documents;
    documents[index].content.autenticado = true
    this.setState({ documents: documents })
    axios
      .get("https://govcarpetaapp.mybluemix.net/apis/authenticateDocument/" + id + "/" + "url" + "/" + title)
      .then(res => {
        alert(res.data);
        let userData = {
          name: title,
          url: url,
          autenticado: true
        }
        axios
          .put("https://micarpeta-b07f1.firebaseio.com/users/" + this.state.userId + "/documents/" + docid + ".json", userData)
          .then(res => {
            console.log(res);
          })
          .catch(err =>
            console.log(err)
          );

      })
      .catch(err =>
        console.log(err)
      );

  }

  showDocs = () => {
    axios
      .get("https://micarpeta-b07f1.firebaseio.com/users/" + this.props.location.state.id + "/documents.json")
      .then(res => {
        console.log(res);
        let newArrayDataOfOjbect = Object.values(res.data)
        console.log(newArrayDataOfOjbect)
        let result = Object.keys(res.data)
          .map(key => ({ id: key, content: res.data[key] }));
        console.log(result)
        this.setState({ documents: result })
      })
      .catch(err =>
        console.log(err)
      );
  };

  render() {

    return (
      <div>
        <Header
          titulo="BCQ"
          boton="Cerrar Sesión"
          click={this.handleClickSignOut}
        />
        <Container>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Aviso Importante</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Tu cuenta para acceder a los servicios de este u otro operador es la
            siguiente:{this.state.userEmail} <br /> Con esta y con tu identificación como
            contraseña puedes ingresar. <br /> Por favor no lo olvides!
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ContainedButton onClick={this.handleClose} title="Cerrar" />
            </DialogActions>
          </Dialog>
          <br></br>
          <div className="homeHeader">
            <h2>Bienvenido {this.state.userEmail}</h2>
          </div>

          <div>
            <progress value={this.state.progress} style={{ width: "150px" }} max="100" />

            <br />
            <div style={{ marginBottom: "50px" }}>
              <input type="file" onChange={this.handleChange} style={{ marginBottom: "10px" }} />
              <ContainedButton disabled={!this.state.fileUploaded} onClick={this.handleUpload} title="Subir" />
            </div>

            {/*  <ContainedButton onClick={this.showDocs} title="Show docs" /> */}
            {this.state.documents.map((document, index) => {
              return (
                <>
                  <div style={{ display: "grid" }}>
                    <ReactTinyLink
                      cardSize="small"
                      showGraphic={true}
                      header={document.content.name}
                      maxLine={2}
                      minLine={1}
                      url={document.content.url}
                      width="100%"
                      description={"Documento" + (document.content.autenticado ? " Autenticado" : " No Autenticado")}
                    />
                    {!document.content.autenticado ?
                      <ContainedButton title="Autenticar" onClick={() => this.validarDocumento(this.state.userId, document.content.url, document.content.name, index, document.id)} />
                      : null}

                  </div>

                  <br></br>
                </>
              );
            })}
          </div>
        </Container>
      </div >
    );
  }

}

export default Home;
