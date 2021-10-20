import { useState } from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';

import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const setDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={setDrawerHandler} />}
      <SideDrawer onClick={setDrawerHandler} show={drawerIsOpen}>
        <nav className={classes.navDrawer}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className={classes.menuButton} onClick={setDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes.title}>
          <Link to="/">Your Places</Link>
        </h1>
        <nav className={classes.navHeader}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
