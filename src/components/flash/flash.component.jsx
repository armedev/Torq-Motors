import React, { useEffect, useState } from 'react';

import './flash.styles.scss';
import { ReactComponent as Close } from '../../assets/flash-assests/close-cross.svg';

import Bus from '../../utils/helpers/bus';

const Flash = () => {
  let [visibility, setVisibility] = useState(false);
  let [message, setMessage] = useState('');
  let [type, setType] = useState('');

  useEffect(() => {
    Bus.addListener('flash', ({ message, type }) => {
      console.log('running');
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  useEffect(() => {
    if (document.querySelector('.close') !== null) {
      document
        .querySelector('.close')
        .addEventListener('click', () => setVisibility(false));
    }
  });

  return (
    visibility && (
      <div className={`alert alert-${type}`}>
        <p>{message}</p>
        <span className="close">
          <Close style={{ width: '15px', height: '15px' }} />
        </span>
      </div>
    )
  );
};

export default Flash;
