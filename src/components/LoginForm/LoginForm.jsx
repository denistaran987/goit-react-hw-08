import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import s from './LoginForm.module.css';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { IoArrowUndo } from 'react-icons/io5';

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
    <section className={s.section}>
      <Link className={s.goback} to="/">
        <IoArrowUndo />
        Go Home
      </Link>
      <div className="container">
        <h2 className={s.title}>Log In</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={contactFormSchema}
          validateOnBlur={false}
        >
          <Form className={s.form}>
            <label className={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
              Email
              <Field className={s.field} type="text" name="email" placeholder="Enter your email" />
              <ErrorMessage className={s.error} name="email" component="span" />
            </label>
            <label className={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
              Password
              <Field
                className={s.field}
                type="text"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage className={s.error} name="password" component="span" />
            </label>
            <button className={s.button} type="submit">
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};
export default LoginForm;
