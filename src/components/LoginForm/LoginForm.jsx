import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import s from './LoginForm.module.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(res => {
        toast.success(`Welcome, ${res.user.name}`, {
          style: { backgroundColor: '#00ced1', fontWeight: 'bold' },
          iconTheme: {
            primary: 'white',
            secondary: 'black',
          },
        });
        navigate('/contacts');
      })
      .catch(() => {
        toast.error('Invalid login or password. Please try again.', {
          style: { backgroundColor: '#FFCCCC', fontWeight: 'bold' },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        });
      });
    resetForm();
  };

  const contactFormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please, enter the email'),
    password: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long')
      .required('Please, enter the password'),
  });

  return (
    <>
      <h2>Log In</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactFormSchema}
        validateOnBlur={false}
      >
        <Form>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Email
            <Field type="text" name="email" placeholder="Enter your email" />
            <ErrorMessage className={s.error} name="email" component="span" />
          </label>{' '}
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Password
            <Field type="text" name="password" placeholder="Enter your password" />
            <ErrorMessage className={s.error} name="password" component="span" />
          </label>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </>
  );
};
export default LoginForm;
