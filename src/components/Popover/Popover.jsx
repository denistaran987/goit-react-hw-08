import { Popover, Typography } from '@mui/material';
import { useState } from 'react';
import s from '../Popover/Popover.module.css';

const MouseHoverPopover = ({ popoverText, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        tabIndex={0}
      >
        {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={s.popover}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, color: 'red' }}>{popoverText}</Typography>
      </Popover>
    </div>
  );
};
export default MouseHoverPopover;
