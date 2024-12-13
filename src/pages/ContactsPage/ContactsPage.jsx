import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactForm from '../../components/ContactForm/ContactForm';
import { selectContacts, selectError, selectLoading } from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import { useEffect } from 'react';
import s from '../ContactsPage/ContactsPage.module.css';
import clsx from 'clsx';

const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={s.section}>
      <div className={clsx('container', s['contacts-container'])}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        {!loading && !error && contacts.length === 0 && (
          <p style={{ color: 'red' }}>
            Sorry, no contacts found. Please add a contact to your phonebook.
          </p>
        )}
        {loading && <Loader />}
        <ContactList />
      </div>
    </div>
  );
};
export default ContactsPage;
