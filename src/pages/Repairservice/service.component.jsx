import React from 'react';

import './service.styles.scss';

import { motion } from 'framer-motion';

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
        <div>Hello</div>
      </div>
    </motion.div>
  );
};

export default ServicePage;
