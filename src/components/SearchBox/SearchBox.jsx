import { useId } from 'react';
import s from '../SearchBox/SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const findId = useId();
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <label className={s.label} htmlFor={findId}>
        Find contacts by name
      </label>
      <input
        className={s.field}
        type="text"
        id={findId}
        onChange={e => {
          const value = e.target.value.toLowerCase();
          dispatch(changeFilter(value));
        }}
      />
    </div>
  );
};
export default SearchBox;
