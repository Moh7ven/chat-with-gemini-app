import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Saisir from "./components/Saisir/Saisir";
import Title from "./components/Title/Title";
import Message from "./components/Message/Message";

function App() {
  return (
    <>
      <Title />
      <Saisir />
    </>
  );
}

export default App;
