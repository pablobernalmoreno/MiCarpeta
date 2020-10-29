import React from "react";
import config from "../auth/firebaseConfig";

function Home(props) {
  const handleClickSignOut = () => {
    config
      .auth()
      .signOut()
      .then((user) => {
        props.history.push("/");
      })
      .catch((error) => {});
  };
  return (
    <div>
      <h1>Home</h1>
      <input type="text" />
      <button onClick={handleClickSignOut}>Sign Out</button>
    </div>
  );
}

export default Home;
