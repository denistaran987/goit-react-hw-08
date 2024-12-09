import { NavLink } from 'react-router';
import s from '../Header/Header.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={s.header}>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
      <ul>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </ul>
    </header>
  );
};
export default Header;
