import React, { useState } from 'react';
import uuid from 'uuid';
import Cropper from './Cropper';
import Button from '@material-ui/core/Button';  
import { makeStyles } from '@material-ui/core/styles';
import PhotoIcon from '@material-ui/icons/Photo';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CropIcon from '@material-ui/icons/Crop';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    input: {
        // display: 'none',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
    flex: 1,
    },
}));

type Image = { id: string, src: string | ArrayBuffer | null }

interface ImageItemProps {
    imageDeleteHandler: (id: string) => void;
    imageCropHandler: (id: string, result: string | ArrayBuffer | null) => void;
    key: string;
    id: string;
    index: number;
    src: string | ArrayBuffer | null;
}

const ImageItem: React.FC<ImageItemProps> = props => {
    const classes = useStyles();
    const [fullWidth, setFullWidth] = useState<boolean>(true);
    const [maxWidth, setMaxWidth] = useState<false | "md" | "xs" | "sm" | "lg" | "xl" | undefined>("md");
    const [show, setShow] = useState<boolean>(false)

    const openModal = () => {
        setShow(true);
    }

    const closeModal = () => {
        setShow(false);
    }

    // eslint-disable-next-line
    const handleMaxWidthChange = event => {
        setMaxWidth(event.target.value);
    };

    // eslint-disable-next-line
    const handleFullWidthChange = event => {
        setFullWidth(event.target.checked);
    };

    const [croppedSrc, setCroppedSrc] = useState(props.src);

    const setCropHandler = () => {
        props.imageCropHandler(props.id, croppedSrc);
        closeModal();
    }

    return (
        <React.Fragment>
            <Dialog 
                fullWidth={fullWidth}
                maxWidth={maxWidth} 
                open={show} 
                onClose={closeModal}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={closeModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Crop
                        </Typography>
                        <Button autoFocus color="inherit" onClick={setCropHandler}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Cropper src={props.src} croppedSrc={croppedSrc} setCroppedSrc={setCroppedSrc} />
                </div>
            </Dialog>
            <Grid container spacing={0}>
                <Grid item xs={6} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <img height="80" width="80" src={String(props.src)} alt="ImageSrc" />
                </Grid>
                <Grid item xs={3}>
                    <IconButton aria-label="crop" className={classes.margin} onClick={openModal}>
                        <CropIcon style={{ color: 'black' }} fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item xs={3}>
                    <IconButton aria-label="delete" className={classes.margin} onClick={()=>{props.imageDeleteHandler(props.id)}}>
                        <CloseIcon style={{ color: 'black' }} fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            <hr></hr>
        </React.Fragment>
    )
}

interface ImageListProps {
    items: Image[];
    imageDeleteHandler: (id: string) => void;
    imageCropHandler: (id: string, result: string | ArrayBuffer | null) => void;
}

const ImageList: React.FC<ImageListProps> = props => {
    return (
        <div>
            {props.items.map((image: Image, index: number) => 
                    <ImageItem
                        imageDeleteHandler={props.imageDeleteHandler}
                        imageCropHandler={props.imageCropHandler}
                        key={image.id} 
                        id={image.id}
                        index={index}
                        src={image.src}
                    />
                )}
        </div>
    )
}

const ImageCrop: React.FC = () => {
    const classes = useStyles();
    const [imgSrc, setImgSrc] = useState<Image[]>([]);

    const imagePushHandler = (result: string | ArrayBuffer | null) => {
        setImgSrc([...imgSrc, {id: uuid(), src: result}])
        console.log(imgSrc)
    }

    const imageDeleteHandler = (id: string) => {
        setImgSrc(imgSrc.filter((img) => img.id !== id))
    }

    const imageCropHandler = (id: string, result: string | ArrayBuffer | null) => {
        let newImg = imgSrc
        for (let i=0; i<newImg.length; i++) {
            if (newImg[i].id === id) {
                newImg[i].id = uuid();
                newImg[i].src = result;
            }
        }
        setImgSrc([...newImg]);
    }

    const onSelectFile:  ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined = event => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            // ImageSetter(null);
            reader.addEventListener("load", () => {
                imagePushHandler(reader.result)
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div>
            <ImageList items={imgSrc} imageDeleteHandler={imageDeleteHandler} imageCropHandler={imageCropHandler} />
                <Grid container spacing={0} style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <Grid style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }} item xs={6}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            onChange={onSelectFile}
                            type="file"
                        />
                        <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span">
                            <PhotoIcon /> &nbsp; ADD IMAGE
                        </Button>
                        </label>
                    </Grid>
                    <Grid style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }} item xs={6}>
                        {imgSrc.length > 0 && (
                            <Button variant="contained" color="primary" component="span">
                                <NoteAddIcon /> &nbsp; GENERATE
                            </Button>
                        )}
                    </Grid>
                </Grid>
        </div>
    )
}

export default ImageCrop;