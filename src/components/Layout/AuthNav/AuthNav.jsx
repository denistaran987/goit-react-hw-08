import clsx from 'clsx';
import { NavLink } from 'react-router';
import s from '../AuthNav/AuthNav.module.css';

const AuthNav = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <nav className={s.nav}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log In
      </NavLink>
    </nav>
  );
};
export default AuthNav;
