import React from 'react';
import MagicDropzone from 'react-magic-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import upload from './upload.svg';

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
    }
}));

const Upload = () => {
    const classes = useStyles();

    const onDrop = (accepted, rejected, links) => {
        if (accepted && accepted.length > 0) {
            console.log(accepted[0])
        }
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
                        <h1>h</h1>

                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Upload;