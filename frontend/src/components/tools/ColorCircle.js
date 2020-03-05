import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { SketchPicker } from 'react-color';

const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: 'none !important',
    },
    shape: {
        width: 30,
        height: 30,
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
  const [bg, setBg] = useState({ "hex": "#000" });

  const handleChangeColor = (color) => {
    setBg(color);
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
      <div className={clsx(classes.shape, classes.shapeCircle)} style={{ backgroundColor: `${ bg.hex }` }} onClick={handleClick} />
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