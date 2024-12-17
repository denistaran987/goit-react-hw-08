import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { IoArrowUndo, IoEyeOutline } from 'react-icons/io5';
import Loader from '../Loader/Loader';
import { selectIsLoading } from '../../redux/auth/selectors';
import { useState } from 'react';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = event => {
    setShowPassword(event.target.checked);
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values.password !== values.confirmPassword) {
      return toast.error('Password is not correct', {
        style: { backgroundColor: '#FFCCCC', fontWeight: 'bold' },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    }
    dispatch(register(values))
      .unwrap()
      .then(res => {
        console.log(res);
        toast.success(`Registration successful! Welcome, "${res.user.name}!"`, {
          style: { backgroundColor: '#00ced1', fontWeight: 'bold' },
          iconTheme: {
            primary: 'white',
            secondary: 'black',
          },
        });
        navigate('/login');
        resetForm();
      })
      .catch(() => {
        toast.error(`This account already exists. Please try logging in.`, {
          style: { backgroundColor: '#FFCCCC', fontWeight: 'bold' },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        });
        resetForm();
      });
  };

  const contactFormSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long').required('Please, enter your name'),
    email: Yup.string()
      .email('Invalid email address')
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please, enter the email'),
    password: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long')
      .required('Please, enter the password'),
    confirmPassword: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long')
      .required('Please, confirm the password'),
  });

  return (
    <section className={s.section}>
      {isLoading && <Loader />}
      <Link className={s.goback} to="/">
        <IoArrowUndo />
        Go Home
      </Link>
      <div className="container">
        <h2 className={s.title}>Registration</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={contactFormSchema}
          validateOnBlur={false}
        >
          <Form className={s.form}>
            <label className={s.label}>
              Name
              <Field className={s.field} type="text" name="name" placeholder="Enter your name" />
              <ErrorMessage className={s.error} name="name" component="span" />
            </label>
            <label className={s.label}>
              Email
              <Field className={s.field} type="email" name="email" placeholder="Enter your email" />
              <ErrorMessage className={s.error} name="email" component="span" />
            </label>
            <div className={s['container-field']}>
              <label className={s.label}>
                Password
                <Field
                  className={s.field}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage className={s.error} name="password" component="span" />
              </label>
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
            <div className={s['container-field']}>
              <label className={s.label}>
                Confirm Password
                <Field
                  className={s.field}
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                />
                <ErrorMessage className={s.error} name="confirmPassword" component="span" />
              </label>
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
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};
export default RegistrationForm;
