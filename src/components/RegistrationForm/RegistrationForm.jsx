import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
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
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactFormSchema}
      validateOnBlur={false}
    >
      <Form>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Name
          <Field type="text" name="name" placeholder="Enter your name" />
          <ErrorMessage className={s.error} name="name" component="span" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Email
          <Field type="text" name="email" placeholder="Enter your email" />
          <ErrorMessage className={s.error} name="email" component="span" />
        </label>{' '}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Password
          <Field type="text" name="password" placeholder="Enter your password" />
          <ErrorMessage className={s.error} name="password" component="span" />
        </label>{' '}
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
