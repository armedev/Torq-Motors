import React from "react";

import "./about-page.styles.scss";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-page__container">
        <h1 className="about-page__title">ABOUT US</h1>
        <span className="about-page__container__desc__main">
          <span>W</span>e are the automobile people trying to fulfill the people
          with 2-wheeler buying and selling needs.
        </span>
        <span className="about-page__container__desc__secondary">
          <span>W</span>e here help the people by buying there loved and used
          2-wheeler to the best possible rate and make their document transfer
          risk at ease.(IN KARNATAKA STATE ONLY)
          <br /> <span>W</span>e also sell the best-trusted and used 2-wheeler
          to the negotiable price which makes us very trustworthy in the overall
          automobile industry, also we transfer the ownership at fluency with no
          additional time and risk.(IN KARNATAKA STATE ONLY)
        </span>
      </div>
    </div>
  );
};

export default AboutPage;
