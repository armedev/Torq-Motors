import React from "react";
import Lottie from "lottie-react";

import "./loader.styles.scss";

const Loader = (Component) => (props) => {
  const { animationData, isLoading, textData } = props;
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) {
    return (
      <div className="lottie">
        <Lottie
          {...defaultOptions}
          style={{
            height: 350,
            width: 350,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "all 0.5s",
          }}
        />
        {textData ? <span className="lottie__text">{textData}</span> : null}
      </div>
    );
  }

  return <Component {...props} />;
};

export default Loader;
