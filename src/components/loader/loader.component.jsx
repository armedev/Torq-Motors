import React from "react";
import Lottie from "react-lottie";

import "./loader.styles.scss";
import animationData from "../../assets/lottie/loading.json";

const Loader = (Component) => ({ isLoading, otherProps }) => {
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
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    );
  }

  return <Component {...otherProps} />;
};

export default Loader;
