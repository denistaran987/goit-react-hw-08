import { NavLink } from 'react-router';

const AuthNav = () => {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Log In</NavLink>
    </div>
  );
};
export default AuthNav;
