import React from 'react';

import './service.styles.scss';
import { ReactComponent as Repair } from '../../assets/service-assets/repair.svg';
import { ReactComponent as Ride } from '../../assets/service-assets/helmet.svg';
import { ReactComponent as Repeat } from '../../assets/service-assets/repeat-2.svg';

import { motion } from 'framer-motion';
import { animationfunc } from '../../utils/button-animations/otherfuncs';

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

const ServicePage = () => {
  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="service"
    >
      <div className="service__container">
        <div className="service__container__first">
          <div className="service__container__first__header">
            Service and Repairs:
          </div>
          <ul className="service__container__first__list">
            <li>
              Servicing is all it takes to mantain a good health of a bike.
            </li>
            <li>
              From just Lubrication to Complete Service and make over we handle
              it with care.
            </li>
            <li>
              We use automated tools for faster repairs and services so that you
              don`t have to wait for your loved one back home.
            </li>
            <li>
              We replace the components with genuine and high durability parts
              and rest assured.
            </li>
            <li>
              Our highly trained technicians know how bikes breathe and will
              handle their extreme pulses.
            </li>
            <li>
              For Faster and Durable return of your BIKE choose TORQ MOTORS.
            </li>
          </ul>
        </div>
        <div className="service__container__second">
          <div className="service__container__second__header">Our 3R's:</div>
          <div className="service__container__second__list">
            <div>
              <Ride />
            </div>
            <div>
              <Repair />
            </div>
            <div>
              <Repeat />
            </div>
          </div>
        </div>
        <div className="service__container__third">
          <div className="service__container__third__header">
            Book A Service
          </div>
          <div
            onMouseEnter={(e) => animationfunc(e)}
            className="service__container__third__button button__styles drive"
          >
            ClickHere!
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicePage;
