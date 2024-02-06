import "./css/style.css";
import React from "react";
import { useEffect } from "react";

const Album = () => {
  return (
    <div className="album-page">
      <div className="album-wrapper">
        <div className="left-bookcover">
          <div className="left-album">
            <div className="left-border">
              {seals_layouts.map((item, idx) => {
                return (
                  <div className="seal-edge">
                    <div className="content">
                      <div className="none-seal">?</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="right-bookcover">
          <div className="right-album">
            <div className="right-border"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
const seals_layouts = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];
