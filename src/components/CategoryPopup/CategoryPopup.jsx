import "./css/style.css";
import React, { useCallback, useState } from "react";

const CategoryPopup = () => {
  const [categoryInfo, setCategoryInfo] = useState("");
  const [colorChecked, setColorChecked] = useState("red");
  const onCategoryInfo = useCallback((e) => {
    setCategoryInfo(e.target.value);
  }, []);
  const onColorChecked = useCallback(
    (color) => {
      setColorChecked(color);
      console.log(color);
    },
    [colorChecked]
  );

  return (
    <div className="category-popup-page">
      <div className="background"></div>
      <div className="popup-container">
        <label className="subtitle">캐릭터 이름</label>
        <input
          className="character-name"
          value={categoryInfo}
          onChange={onCategoryInfo}
        ></input>
        <div className="subtitle">배경색</div>
        <div className="bg-color-wrapper">
          {color_layouts.map((item, idx) => {
            return (
              <label
                key={idx}
                className={`bg-color-label ${item} ${
                  colorChecked === item && "checked-bg"
                }`}
                htmlFor={item}
              >
                <button
                  id={item}
                  className="bg-color"
                  onClick={() => onColorChecked(item)}
                ></button>
              </label>
            );
          })}
        </div>
        <button
          className="category-create-btn"
          disabled={categoryInfo ? null : `disabled`}
        >
          만들기
        </button>
      </div>
    </div>
  );
};

export default CategoryPopup;

const color_layouts = ["red", "orange", "yellow", "green", "blue"];
