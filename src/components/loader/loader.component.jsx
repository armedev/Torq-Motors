import React from "react";
import Lottie from "lottie-react";

import "./loader.styles.scss";

const Loader = (Component) => (props) => {
  const { animationData, isLoading } = props;
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
            height: 200,
            width: 200,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "all 0.5s",
          }}
        />
      </div>
    );
  }

  return <Component {...props} />;
};

export default Loader;
