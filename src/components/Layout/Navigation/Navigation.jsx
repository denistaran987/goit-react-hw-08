import { NavLink } from 'react-router';
import s from '../Navigation/Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <nav className={s.nav}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/contacts">
        Contacts
      </NavLink>
    </nav>
  );
};
export default Navigation;
