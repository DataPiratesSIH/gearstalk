import React, { useState } from 'react';
import Button from '@material-ui/core/Button';  
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        // display: 'none',
    },
}));

const ImageCrop = () => {
    const classes = useStyles();
    const [imgSrc, setImgSrc] = useState();

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            // ImageSetter(null);
            reader.addEventListener("load", () => {
                setImgSrc(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div>
            <div style={{ width: "100px", height: "200px" }}>
                <img height="100" width="100" src={imgSrc} alt="ImageSrc" />
            </div>
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="outlined-button-camera"
                        type="file"
                        onChange={onSelectFile}
                        capture
                    />
            
            <label htmlFor="outlined-button-file">
                <Button variant="contained" color="primary" component="span">
                    <FileCopyIcon /> &nbsp; CHOOSE IMAGE
                </Button>
            </label>
            </div>
        </div>
    )
}

export default ImageCrop;