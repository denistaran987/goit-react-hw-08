import { Outlet } from 'react-router';
import AppBar from './AppBar/AppBar';

const Layout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
export default Layout;
