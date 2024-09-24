import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Message from "./components/Message/Message";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignUp /> },
    { path: "/signin", element: <SignIn /> },
    
    { path: "/message", element: <Message /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
