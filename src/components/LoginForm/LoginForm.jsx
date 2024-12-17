import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import * as Yup from 'yup';
import s from './LoginForm.module.css';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { IoArrowUndo, IoEyeOutline } from 'react-icons/io5';
import { selectIsLoading } from '../../redux/auth/selectors';
import Loader from '../Loader/Loader';
import { useState } from 'react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = event => {
    setShowPassword(event.target.checked);
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values))
      .unwrap()
      .then(res => {
        toast.success(`Welcome, "${res.user.name}"`, {
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
      {isLoading && <Loader />}
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
              <Field className={s.field} type="email" name="email" placeholder="Enter your email" />
              <ErrorMessage className={s.error} name="email" component="span" />
            </label>
            <div className={s['container-field']}>
              <label
                className={s['label-password']}
                style={{ display: 'flex', flexDirection: 'column', rowGap: '6px' }}
              >
                Password
                <Field
                  className={s.field}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                />
              </label>
              <ErrorMessage className={s.error} name="password" component="span" />
              <label className={s['label-checkbox']}>
                <IoEyeOutline />
                <Field
                  className={s['field-checkbox']}
                  type="checkbox"
                  name="checkbox"
                  checked={showPassword}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
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
