import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import ColorCircle from './ColorCircle';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    selectEmpty: {
      marginTop: theme.spacing(2),
      button: {
        margin: theme.spacing(1),
      },
    },
}));

const AttributeSelector = () => {
    // eslint-disable-next-line
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = event => {
        setAge(event.target.value);
    };

    return (
                <Grid container spacing={1}>
                    <Grid style={{ paddingTop: "20px" }} item xl={2} lg={2} md={2} xs={2} sm={2}>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center' 
                            }}>
                            <ColorCircle />
                        </div>
                    </Grid>
                    
                    <Grid item xl={8} lg={8} md={8} xs={8} sm={8}>
                        <InputLabel id="demo-simple-select-label">Cloth</InputLabel>
                        <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        >
                        <MenuItem value="Shirt">Shirt</MenuItem>
                        <MenuItem value="Pant">Pant</MenuItem>
                        <MenuItem value="Underwear">Underwear</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} xs={2} sm={2}>
                    <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center' 
                            }}>
                            <IconButton>
                            <CloseIcon />
                        </IconButton>
                        </div>
                    </Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                    >
                        ADD
                    </Button>
                    
                </Grid>
                
    )
}

export default AttributeSelector;