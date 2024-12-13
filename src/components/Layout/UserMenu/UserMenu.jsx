import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth/operations';
import s from '../UserMenu/UserMenu.module.css';
import { IoExitOutline } from 'react-icons/io5';
import Loader from '../../Loader/Loader';
import { selectIsLoading, selectUser } from '../../../redux/auth/selectors';
import { FaUserLarge } from 'react-icons/fa6';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  return (
    <div className={s.container}>
      <div className={s['user-container']}>
        <FaUserLarge className={s['user-icon']} />
        <p>{`${user.name}`}</p>
      </div>
      <button className={s['logout-button']} type="button" onClick={() => dispatch(logout())}>
        <span className={s['logout-text']}>Loguot</span>
        <IoExitOutline className={s['logout-icon']} />
      </button>
      {isLoading && <Loader />}
    </div>
  );
};
export default UserMenu;
