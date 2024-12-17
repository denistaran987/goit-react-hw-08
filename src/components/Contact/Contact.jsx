import { FaPhone } from 'react-icons/fa6';
import { FaUserLarge } from 'react-icons/fa6';
import s from './Contact.module.css';
import ConfirmPoper from '../ConfirmPopper/ConfirmPopper';
import EditModal from '../EditModal/EditModal';

const Contact = ({ contact }) => {
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
      <div className={s['button-container']}>
        <EditModal id={id} contact={contact} />
        <ConfirmPoper id={id} />
      </div>
    </>
  );
};
export default Contact;
