import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import { NavLink } from 'react-router';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
    </nav>
  );
};
export default Navigation;
