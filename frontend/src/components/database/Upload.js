import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import MagicDropzone from 'react-magic-dropzone';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';  
import CancelIcon from '@material-ui/icons/Cancel';
import upload from './upload.svg';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    container: {
        padding: '30px'
    },
    dropzone: {
        margin: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '2px dashed #1c233e', 
        height: '100%',
        padding: '16px 11px',
        borderRadius: '5px',
    },
    dropzoneContainer: {
        textAlign: 'center',
    },
    browseButton: {
        textTransform: 'none',
        backgroundColor: '#1273eb', 
        color: '#fff',
        padding: '10px',
        paddingLeft: '15px',
        paddingRight: '15px',
        "&:hover": {
            backgroundColor: '#0a045e'
        }
    },
    drag: {
        color: '#000',
        fontSize: '20px',
        fontWeight: '500',
    },
    or: {
        color: '#0a045e',
        fontSize: '15px',
        fontWeight: '400',
    },
    filePaper: {
        background: '#2a3f73',
        border: '1px solid #4f619a',    
    },
    verticalText: {
        minHeight: '60px',
        lineHeight: '60px',
        textAlign: 'center',
    },
    verticalSpan: {
        display: 'inline-block',
        verticalAlign: 'middle',
        lineHeight: 'normal',
    }
}));

const Upload = () => {
    const classes = useStyles();
    const [videoFile, setVideoFile] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDrop = (accepted, rejected, links) => {
        if (accepted && accepted.length > 0) {
            setVideoFile(null)
            console.log(accepted[0])
            setVideoFile(accepted[0])
        }
    }

    const clearVideoFile = () => {
        setVideoFile(null);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    return (
        <div className={classes.container}>
            <Paper square>
                <Grid container>
                    <Grid style={{ backgroundColor: '#d6dffe'}} item md={7} sm={12} xs={12}>
                        <div>
                            <MagicDropzone 
                                className={classes.dropzone} 
                                accept="video/mp4, video/x-m4v, video/*" 
                                multiple={false} 
                                onDrop={onDrop}
                            >
                                <div className={classes.dropzoneContainer}>
                                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                                        <img width="100" src={upload} alt="upload" />
                                        <p className={classes.drag}>Drag and drop videos here</p>
                                        <p className={classes.or}>or</p>
                                        <Button className={classes.browseButton}>Browse Videos</Button>
                                    </div>
                                </div>
                            </MagicDropzone>
                        </div>
                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <div style={{ padding: '20px' }}>
                            <Paper className={classes.filePaper} variant="outlined" square>
                                    {videoFile ? (
                                        <Grid container>
                                            <Grid className={classes.verticalText} item xs={10}>
                                                <span className={classes.verticalSpan}>
                                                    {videoFile.name}
                                                </span>
                                            </Grid>
                                            <Grid className={classes.verticalText} item xs={2}>
                                                <IconButton aria-label="clear" onClick={clearVideoFile}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container>
                                            <Grid className={classes.verticalText} item xs={12}>
                                                No video uploaded
                                            </Grid>
                                        </Grid>
                                    )}
                            </Paper>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Typography variant='h5' style={{ color: '#758cd1' }}>Date</Typography>
                                    <KeyboardDateTimePicker
                                        variant="inline"
                                        ampm={false}
                                        label="Select Date and Timestamp"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        onError={console.log}
                                        disablePast
                                        format="yyyy/MM/dd HH:mm"
                                    />
                                   
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>


                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Upload;