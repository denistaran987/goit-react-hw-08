import { FaPhone } from 'react-icons/fa6';
import { FaUserLarge } from 'react-icons/fa6';
import s from './Contact.module.css';
import ConfirmPoper from '../Popper/Popper';

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
      <ConfirmPoper id={id} />
    </>
  );
};
export default Contact;
