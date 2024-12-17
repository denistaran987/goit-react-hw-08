import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import MouseHoverPopover from '../Popover/Popover';
import s from '../EditModal/EditModal.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../redux/contacts/operations';
import { FaEdit } from 'react-icons/fa';
import { TextField } from '@mui/material';
import { setEditData } from '../../redux/contacts/slice';
import { selectEditData } from '../../redux/contacts/selectors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ id, contact }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const editData = useSelector(selectEditData);
  const handleOpen = contact => {
    setOpen(true);
    dispatch(setEditData(contact));
  };
  const handleClose = () => {
    dispatch(setEditData(null));
    setOpen(false);
  };

  const initialValues = {
    name: editData?.name || '',
    number: editData?.number || '',
  };

  const handleSubmit = ({ name, number }, { resetForm }) => {
    if (editData.name === name && editData.number === number) {
      return toast.error('You did not edit...', {
        style: { backgroundColor: '#FFCCCC', fontWeight: 'bold' },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    }
    toast.promise(
      dispatch(editContact({ id, name, number })).unwrap(),
      {
        loading: <p>Editing contact...</p>,
        success: <b>The contact has been successfully updated!</b>,
        error: <b>Unable to update the contact. Please try again.</b>,
      },
      {
        success: {
          style: {
            background: '#00ced1',
            color: '#fff',
            fontWeight: 'bold',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black',
          },
        },
        error: {
          style: {
            background: '#FFCCCC',
            color: '#fff',
            fontWeight: 'bold',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'black',
          },
        },
      }
    );
    handleClose();
    resetForm();
  };

  return (
    <div>
      <button className={s['button-icon']} onClick={() => handleOpen(contact)}>
        <MouseHoverPopover popoverText="Edit">
          <FaEdit className={s.icon} />
        </MouseHoverPopover>
      </button>
      <Modal
        className={s['modal-overlay']}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className={s['modal-content']}>
          <Typography className={s.title} id="keep-mounted-modal-title" variant="h6" component="h2">
            Edit Contact
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
            <Form className={s.form}>
              <Field
                className={s.field}
                as={TextField}
                type="text"
                name="name"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
              ></Field>
              <Field
                className={s.field}
                as={TextField}
                type="text"
                name="number"
                id="outlined-basic"
                label="Number"
                variant="outlined"
                size="small"
              ></Field>
              <button className={s.button} type="submit">
                Edit
              </button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
