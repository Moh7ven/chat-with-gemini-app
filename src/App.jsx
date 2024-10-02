import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../index.css";
// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Message from "./components/Message/Message";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import Chat from "./pages/Chat/Chat";
import Message from "./pages/Message/Message";
import Principal from "./pages/Principal/Principal";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/message/:chatId", element: <Message /> },
    { path: "/chat", element: <Chat /> },
    { path: "/index", element: <Principal /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
