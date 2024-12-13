import { useState, useRef } from 'react';
import { Popper, Button, Typography } from '@mui/material';

const ConfirmPopper = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null); // Ссылка на элемент, к которому будет привязан Popper

  const handleClick = () => {
    setOpen(prev => !prev); // Переключение состояния отображения Popper
  };

  const handleConfirm = () => {
    console.log('Confirmed!');
    setOpen(false); // Закрываем Popper после подтверждения
  };

  const handleCancel = () => {
    console.log('Cancelled!');
    setOpen(false); // Закрываем Popper после отмены
  };

  return (
    <div>
      {/* Кнопка, по которой открывается Popper */}
      <Button ref={anchorRef} onClick={handleClick} variant="contained">
        Show Popper
      </Button>

      {/* Popper с кнопками для подтверждения и отмены */}
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
        <div
          style={{
            padding: '10px',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: '4px',
          }}
        >
          <Typography>Are you sure?</Typography>
          <div style={{ marginTop: '10px' }}>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              Confirm
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Popper>
    </div>
  );
};

export default ConfirmPopper;
