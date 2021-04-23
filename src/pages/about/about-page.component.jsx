import React from 'react';
import { motion } from 'framer-motion';

import './about-page.styles.scss';
import service from '../../assets/about-assets/1-about.jpg';
import buy from '../../assets/about-assets/3-about.jpg';
import sell from '../../assets/about-assets/2-about.jpg';

import { RightCard, LeftCard, SmallCard } from '../../components/about-card/';
import { default as useWindowResolution } from '../../utils/custom-hooks/usewindowresolution';

const staggerAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
      direction: 1,
      when: 'afterChildren',
    },
  },
  out: {
    opacity: 0,
  },
};

const AboutPage = () => {
  const { width } = useWindowResolution();
  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="about-page"
    >
      <div className="about-page">
        <div className="about-page__container">
          <div className="about-page__container__header">
            <h1>About Us</h1>
            <span className="about-page__container__header__main">
              <span>W</span>e are the automobile people trying to fulfill the
              people with all their 2-wheeler needs.
              <br />
            </span>
            <span className="about-page__container__header__secondary">
              <span>W</span>e help the people by buying there loved and used
              2-wheeler to the best possible rate and make their document
              transfer risk at ease.(IN KARNATAKA STATE ONLY)
              <br /> <span>W</span>e also sell the best-trusted and used
              2-wheeler to the negotiable price which makes us very trustworthy
              in the overall automobile industry, also we transfer the ownership
              at fluency with no additional time and risk.(IN KARNATAKA STATE
              ONLY)
            </span>
          </div>
          <div className="about-page__container__desc-main">
            <span className="about-page__container__desc-main__header">
              Our Services
            </span>
            {width > '1400' ? (
              <>
                <RightCard
                  image={service}
                  routeName={'service'}
                  headerText={'Repairs and Service'}
                  desc={'Perfect repairs and Enhancements for your bike'}
                />
                <LeftCard
                  image={buy}
                  routeName={'buy'}
                  headerText={'Buying'}
                  desc={
                    'Buy our clean and stirdy pre-owned bike for the perfect price.'
                  }
                />
                <RightCard
                  image={sell}
                  routeName={'sell'}
                  headerText={'Selling'}
                  desc={'Sell Your Bike to us for the perfect market price'}
                />
              </>
            ) : (
              <>
                <SmallCard
                  image={service}
                  routeName={'service'}
                  headerText={'Repairs and Service'}
                  desc={'Perfect repairs and Enhancements for your bike'}
                />
                <SmallCard
                  image={buy}
                  routeName={'buy'}
                  headerText={'Buying'}
                  desc={
                    'Buy our clean and stirdy pre-owned bike for the perfect price.'
                  }
                />
                <SmallCard
                  image={sell}
                  routeName={'sell'}
                  headerText={'Selling'}
                  desc={'Sell Your Bike to us for the perfect market price'}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
