import { FaPhone } from 'react-icons/fa6';
import { FaUserLarge } from 'react-icons/fa6';
import s from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { MdDeleteForever } from 'react-icons/md';
import MouseHoverPopover from '../Popover/Popover';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { name, number, id } = contact;

  return (
    <>
      <div className={s.container}>
        <p>
          <FaUserLarge /> {name}
        </p>
        <p>
          <FaPhone /> {number}
        </p>
      </div>
      <button
        className={s.button}
        onClick={() => {
          dispatch(deleteContact(id));
        }}
        type="button"
      >
        <MouseHoverPopover popoverText="Delete">
          <MdDeleteForever className={s.icon} />
        </MouseHoverPopover>
      </button>
    </>
  );
};
export default Contact;
