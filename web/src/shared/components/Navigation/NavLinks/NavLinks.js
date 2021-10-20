import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/auth-context';

import classes from './NavLinks.module.css';

const NavLinks = () => {
  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes.navLinks}>
      <li>
        <NavLink activeClassName={classes.active} to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink
            activeClassName={classes.active}
            to={`/${authCtx.userId}/places`}
          >
            MY PLACES
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink activeClassName={classes.active} to="/places/new">
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink activeClassName={classes.active} to="/login">
            LOGIN
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
