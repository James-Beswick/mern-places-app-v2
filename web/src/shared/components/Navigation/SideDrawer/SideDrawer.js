import { createPortal } from 'react-dom';

import { CSSTransition } from 'react-transition-group';

import classes from './SideDrawer.module.css';

const SideDrawer = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={onClick} className={classes.sideDrawer}>
        {children}
      </aside>
    </CSSTransition>
  );

  return createPortal(content, document.getElementById('side_drawer'));
};

export default SideDrawer;
