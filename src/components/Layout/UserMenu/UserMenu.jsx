import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth/operations';
// import { selectUser } from '../../../redux/auth/selectors';
import s from '../UserMenu/UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  return (
    <div className={s.container}>
      {/* <p>{`Welcome, Denis`}</p> */}
      <button type="button" onClick={() => dispatch(logout())}>
        Loguot
      </button>
    </div>
  );
};
export default UserMenu;
