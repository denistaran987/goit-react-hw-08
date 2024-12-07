import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import s from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  const contactFormSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long').required('Required'),
    number: Yup.string().min(3, 'Too Short!').max(50, 'Too Long').required('Required'),
  });

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={handleSubmit}
        validationSchema={contactFormSchema}
        validateOnBlur={false}
      >
        <Form className={s.form}>
          <label className={s.label} htmlFor={nameFieldId}>
            Name
            <Field className={s.field} type="text" name="name" id={nameFieldId} />
            <ErrorMessage className={s.error} name="name" component="span" />
          </label>
          <label className={s.label} htmlFor={numberFieldId}>
            Number
            <Field className={s.field} type="text" name="number" id={numberFieldId} />
            <ErrorMessage className={s.error} name="number" component="span" />
          </label>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default ContactForm;
