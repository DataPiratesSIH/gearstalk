import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { SketchPicker } from 'react-color';

const useStyles = makeStyles(theme => ({
    shape: {
        width: 40,
        height: 40,
    },
    shapeCircle: {
        borderRadius: '50%',
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

const ColorCircle = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [bg, setBg] = useState('red');

  const handleChangeColor = (color) => {
    setBg(color.hex);
    console.log(bg);
}

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </Button>
      <div style={{ backgroundColor: `rgba(${bg},)` }} onClick={handleClick}>hi</div>
      {bg}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <SketchPicker
          color={bg}
          onChangeComplete={handleChangeColor}
        />
      </Popover>
    </div>
  );
}

export default ColorCircle;