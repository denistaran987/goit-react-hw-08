import { Navigate } from 'react-router';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};
export default PrivateRoute;
