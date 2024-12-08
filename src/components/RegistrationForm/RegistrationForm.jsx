import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

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

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Name
          <Field type="text" name="name" placeholder="Enter your name" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Email
          <Field type="text" name="email" placeholder="Enter your email" />
        </label>{' '}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Password
          <Field type="text" name="password" placeholder="Enter your password" />
        </label>{' '}
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};
export default RegistrationForm;
