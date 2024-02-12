import "./css/style.css";
import React, { startTransition } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { act } from "react-dom/test-utils";
import { type } from "@testing-library/user-event/dist/type";
import Input from "../Input/Input";
//리덕스는 동기, useReducer는 비동기적 처리 뭐가나아?

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return {
        ...state,
        email: action.value,
      };
    case "CHANGE_NICKNAME":
      return {
        ...state,
        nickname: action.value,
      };
    case "CHANGE_PW":
      return {
        ...state,
        pw: action.value,
      };
    case "CHANGE_PWCONFIRM":
      return {
        ...state,
        pwConfirm: action.value,
      };
    default:
      return state;
  }
};
const initialState = {
  email: "",
  nickname: "",
  pw: "",
  pwConfirm: "",
};
const Join = ({ onType }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isNickname: false,
    isPw: false,
    isPwConfirm: false,
  });
  const [errMsg, setErrMsg] = useState({
    errEmail: "",
    errNickname: "",
    errPw: "",
    errPwConfirm: "",
  });
  const onChange = useCallback((type, value) => {
    dispatch({
      type,
      value,
    });
  }, []);
  useEffect(() => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(state.email)) {
      setIsValid({ ...isValid, isEmail: false });
      setErrMsg({ ...errMsg, errEmail: "올바른 이메일 형식을 입력해주세요" });
    } else {
      setIsValid({ ...isValid, isEmail: true });
      setErrMsg({ ...errMsg, errEmail: "" });
    }

    return () => {};
  }, [state.email]);
  useEffect(() => {
    if (state.nickname.length < 2) {
      setIsValid({ ...isValid, isNickname: false });
      setErrMsg({ ...errMsg, errNickname: "2글자 이상으로 입력해주세요" });
    } else {
      setIsValid({ ...isValid, isNickname: true });
      setErrMsg({ ...errMsg, errNickname: "" });
    }

    return () => {};
  }, [state.nickname]);
  useEffect(() => {
    const regex_pwd =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;
    if (!regex_pwd.test(state.pw)) {
      setIsValid({ ...isValid, isPw: false });
      setErrMsg({
        ...errMsg,
        errPw: "영문 / 특수문자 / 숫자 포함 8자리 이상",
      });
    } else {
      setIsValid({ ...isValid, isPw: true });
      setErrMsg({ ...errMsg, errPw: "" });
    }

    return () => {};
  }, [state.pw]);

  useEffect(() => {
    if (state.pw !== state.pwConfirm) {
      setIsValid({ ...isValid, isPwConfirm: false });
      setErrMsg({ ...errMsg, errPwConfirm: "비밀번호를 다시 확인해주세요" });
    } else {
      setIsValid({ ...isValid, isPwConfirm: true });
      setErrMsg({ ...errMsg, errPwConfirm: "사용가능한 비밀번호입니다" });
    }

    return () => {};
  }, [state.pwConfirm]);

  const onJoin = useCallback(() => {
    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        nickname: state.nickname,
        password: state.pw,
      }),
    })
      .then((response) => response.json())
      .then((todos) => {
        if (todos.state === false) {
          alert("이미 존재하는 이메일입니다. 다시 입력해 주세요.");
        } else {
          onType("login");
        }
      })
      .catch((err) => console.log(err));
  }, [state.email, state.nickname, state.pw]);

  return (
    <div className="join-page">
      <Input
        id="email"
        subtitle="이메일"
        placeholder="이메일을 입력해주세요"
        value={state.email}
        onChange={(e) => onChange("CHANGE_EMAIL", e.target.value)}
        isValid={isValid.isEmail}
        errMsg={errMsg.errEmail}
        type="email"
      />
      <Input
        id="nickname"
        subtitle="닉네임"
        placeholder="활동에 사용할 닉네임을 입력해주세요"
        value={state.nickname}
        onChange={(e) => onChange("CHANGE_NICKNAME", e.target.value)}
        isValid={isValid.isNickname}
        errMsg={errMsg.errNickname}
      />
      <Input
        id="pw"
        subtitle="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        value={state.pw}
        onChange={(e) => onChange("CHANGE_PW", e.target.value)}
        isValid={isValid.isPw}
        errMsg={errMsg.errPw}
        type="password"
      />
      <Input
        id="confirm-pw"
        placeholder="비밀번호를 재입력해주세요"
        value={state.pwConfirm}
        onChange={(e) => onChange("CHANGE_PWCONFIRM", e.target.value)}
        isValid={isValid.isPwConfirm}
        errMsg={errMsg.errPwConfirm}
        type="password"
      />
      <button
        className="join-btn"
        type="submit"
        disabled={
          isValid.isEmail &&
          isValid.isNickname &&
          isValid.isPw &&
          isValid.isPwConfirm === true
            ? false
            : true
        }
        onClick={onJoin}
      >
        가입하기
      </button>
      <button className="back-btn" onClick={() => onType("login")}>
        돌아가기
      </button>
    </div>
  );
};

export default Join;
