import s from "./ButtonDisconnected.module.css";
import { useNavigate } from "react-router-dom";

function ButtonDisconnected() {
  const navigate = useNavigate();
  const logOut = () => {
    console.log("logout");
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      navigate("/signin");
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className={s.container}>
      <button className={s.buttonDisconnected} onClick={() => logOut()}>
        Logout
      </button>
    </div>
  );
}

export default ButtonDisconnected;
