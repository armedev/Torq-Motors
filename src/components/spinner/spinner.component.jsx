import React from "react";

import "./spinner.styles.scss";

const Spinner = ({ textData }) => {
  return (
    <>
      {textData ? (
        <div className="spinner-large">
          <div className="spinner-large__container">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <span className="spinner-large__text">{textData}</span>
        </div>
      ) : (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
