import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header style={{ display: 'flex', gap: 12 }}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}{' '}
    </header>
  );
};
export default AppBar;
