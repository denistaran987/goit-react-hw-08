import { useState, useRef } from 'react';
import { Popper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import MouseHoverPopover from '../Popover/Popover';
import { MdDeleteForever } from 'react-icons/md';
import s from '../Popper/Popper.module.css';
import toast from 'react-hot-toast';

const ConfirmPopper = ({ id }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleConfirm = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(res => {
        return toast.error(`The contact "${res.name}" has been successfully removed.`, {
          style: { backgroundColor: '#FFCCCC', fontWeight: 'bold' },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        });
      })
      .catch(e => {
        console.log(e.message);
      });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className={s['button-icon']} ref={anchorRef} onClick={handleClick}>
        <MouseHoverPopover popoverText="Delete">
          <MdDeleteForever className={s.icon} />
        </MouseHoverPopover>
      </button>
      <Popper open={open} anchorEl={anchorRef.current} placement="top-start">
        <div className={s.popper}>
          <Typography className={s.text}>
            <b>Are you sure?</b>
          </Typography>
          <div className={s['buttons-wrapper']}>
            <button type="button" className={s.button} onClick={handleConfirm}>
              Confirm
            </button>
            <button type="button" className={s.button} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Popper>
    </div>
  );
};

export default ConfirmPopper;
