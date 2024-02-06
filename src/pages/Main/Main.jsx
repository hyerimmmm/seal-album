import "./css/style.css";
import React, { useCallback, useState } from "react";
import Login from "../../components/Login/Login";
import Join from "../../components/Join/Join";
import { useEffect } from "react";

const Main = () => {
  const [type, setType] = useState("login");
  const onType = useCallback(
    (type) => {
      setType(type);
      console.log(type);
    },
    [type]
  );

  return (
    <div className="main-page">
      <div className="logo">SEALS ALBUM</div>
      <div className="main-container">
        <button className="seal-btn">
          {type === "login" ? `로그인` : "회원가입"}
        </button>
        <div className="seal-box">
          {type === "login" ? (
            <Login onType={onType} />
          ) : (
            <Join onType={onType} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
