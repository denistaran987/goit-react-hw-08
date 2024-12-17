import { useState, useRef, useEffect } from 'react';
import { Popper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import MouseHoverPopover from '../Popover/Popover';
import { MdDeleteForever } from 'react-icons/md';
import s from './ConfirmPopper.module.css';
import toast from 'react-hot-toast';

const ConfirmPopper = ({ id }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    const handleClickOutside = e => {
      if (
        anchorRef.current &&
        !anchorRef.current.contains(e.target) &&
        !document.querySelector(`.${s.popper}`)?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleConfirm = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(res => {
        return toast.error(`The contact "${res.name}" has been successfully removed.`, {
          style: { backgroundColor: '#00ced1', fontWeight: 'bold' },
          iconTheme: {
            primary: 'white',
            secondary: 'black',
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
