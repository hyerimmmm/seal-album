import "./css/style.css";
import React, { useCallback, useState } from "react";
import CategoryPopup from "../CategoryPopup/CategoryPopup";
import { useNavigate } from "react-router-dom";

const Login = ({ onType }) => {
  // const [popup, setPopup] = useState(false);
  // const navigate = useNavigate();
  // const onNavigate = () => {
  //   navigate("/album");
  // };
  // const onPopup = useCallback(() => {
  //   setPopup(true);
  // }, [popup]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const onPwChange = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const onLogin = useCallback(() => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((todos) => {
        console.log(todos);
        navigate("/album");
      })
      .catch((err) => console.log(err));
  }, [email, password]);

  return (
    <>
      {/* {popup ? <CategoryPopup /> : null} */}
      <div className="login-page">
        <label htmlFor="email" className="email-label">
          이메일
        </label>
        <input
          className="email"
          type="email"
          id="email"
          placeholder="이메일을 입력해주세요"
          onChange={onEmailChange}
          value={email}
        ></input>
        <label htmlFor="pw" className="pw-label">
          비밀번호
        </label>
        <input
          className="pw"
          id="pw"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          onChange={onPwChange}
          value={password}
        ></input>
        <button className="login-btn" onClick={onLogin}>
          로그인
        </button>
        <div className="join-wrapper">
          <div className="join-text">회원이 아니신가요?</div>
          <button className="join-btn" onClick={() => onType("join")}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
