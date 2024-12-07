import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contactsOps';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectError, selectLoading } from '../redux/contactsSlice';
import Loader from './Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <h1 style={{ fontSize: 40, lineHeight: 1.2 }}>Phonebook</h1>
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
  );
}

export default App;
