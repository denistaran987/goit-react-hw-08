import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contacts/operations';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader/Loader';
import { selectContacts, selectError, selectLoading } from '../redux/contacts/selectors';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';
import { refreshUser } from '../redux/auth/operations';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <h1 style={{ fontSize: 40, lineHeight: 1.2 }}>Phonebook</h1>
      <ContactForm />
      <RegistrationForm />
      <LoginForm />
      <SearchBox />
      {!loading && !error && contacts.length === 0 && (
        <p style={{ color: 'red' }}>
          Sorry, no contacts found. Please add a contact to your phonebook.
        </p>
      )}
      {loading && <Loader />}
      <ContactList />
    </div>
  );
}

export default App;
