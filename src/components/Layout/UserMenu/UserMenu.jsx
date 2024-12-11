import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/operations';

const UserMenu = () => {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  return (
    <div>
      {/* <p>{`Welcome, ${user.name}`}</p> */}
      <button type="button" onClick={() => dispatch(logout())}>
        Loguot
      </button>
    </div>
  );
};
export default UserMenu;
