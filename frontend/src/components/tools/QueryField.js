import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
            flexGrow: 1,
            '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const QueryField = () => {
    const classes = useStyles();
    const [value, setValue] = useState("");

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <React.Fragment>
            <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Type your query"
                    multiline
                    rows="4"
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </form>
        <Grid container spacing={1}>
            <Grid item sm={11} xs={10}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    style={{ width: "100%" }}
                >
                Send
                </Button>
            </Grid>
            <Grid item sm={1} xs={2}>                     
            <IconButton aria-label="voice">
                <KeyboardVoiceIcon color='primary' />
            </IconButton>
            </Grid>
        </Grid>
        </React.Fragment>
    )
}

export default QueryField;