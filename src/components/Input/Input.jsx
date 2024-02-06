import React from "react";
import "./css/style.css";

const Input = ({
  id,
  placeholder,
  value,
  onChange,
  subtitle,
  isValid,
  errMsg,
  type,
}) => {
  return (
    <>
      <div className="subtitle-wrapper">
        <label className="subtitle" htmlFor={id}>
          {subtitle}
        </label>
        {isValid ? "" : <div className="err-msg">{errMsg}</div>}
      </div>
      <input
        className={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      ></input>
    </>
  );
};

export default Input;
