import React from 'react';
import { createPortal } from 'react-dom';

import classes from './Backdrop.module.css';

const Backdrop = props => {
  return createPortal(
    <div className={classes.backdrop} onClick={props.onClick}></div>,
    document.getElementById('drawer_backdrop')
  );
};

export default Backdrop;
