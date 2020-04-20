import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import DateFnsUtils from '@date-io/date-fns';
import MagicDropzone from 'react-magic-dropzone';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';  
import CancelIcon from '@material-ui/icons/Cancel';
import upload from './upload.svg';
import Typography from '@material-ui/core/Typography';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import LoadingSpinner from '../utils/LoadingSpinner';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
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
    },
    chooseLocation: {
        padding: '20px',
    },
    locationPaper: {
        height: '100%',
        background: '#2a3f73',
        border: '1px solid #4f619a',   
    },
    locationButton: {
        paddingBottom: '10px',
        background: '#2a3f73',
        border: '1px solid #4f619a', 
        textAlign: 'center',
        cursor: 'pointer',
        "&:hover": {
            background: '#0a045e',
            border: '1px solid #0a045e',
        }
    },
    uploadButton: {
        width: '100%',
        background: '#30a3f2',
        "&:hover": {
            background: '#0a045e',
            color: '#fff',
        }
    },
    locationChooser: {
        padding: '10px',
        background: '#2a3f73',
        border: '1px solid #4f619a', 
        cursor: 'pointer',
        "&:hover": {
            background: '#0a045e',
            border: '1px solid #0a045e',
        }
    },
    verticalContainer: {
        height: '75px', 
        position: 'relative'
    },
    verticalDiv: {
        textAlign: 'center', 
        margin: 0, 
        position: 'absolute', 
        top: '50%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)'
    },
    loader: {
        paddingTop: '50px',
        paddingBottom: '50px',
    }
}));

const LocationItem = props => {
    const classes = useStyles();

    const changeLocation = () => {
        props.setLocation({
            "oid": props.oid,
            "latitude": props.latitude,
            "longitude": props.longitude,
            "name": props.name
        })
        props.setTitle(props.name)
    }

    return (
        <Grid 
            className={classes.locationChooser} 
            onClick={changeLocation}
            item lg={2} md={2} sm={4} xs={6}
        >
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.verticalContainer}>
                        <div className={classes.verticalDiv}>
                            <LocationOnIcon fontSize='large' />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontSize: '12px' }}>
                        Latitude
                    </div>
                    <div style={{ color: '#fff'}}>
                        {props.latitude.toFixed(3)}
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        Longitude
                    </div>
                    <div style={{ color: '#fff'}}>
                        {props.longitude.toFixed(3)}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}

const LocationDialog = props => {
    const classes = useStyles();
    const [locationData, setLocationData] = useState();
    const [searchData, setSearchData] = useState();
    const [title, setTitle] = useState("Choose a Location")
    const [searchText, setSearchText] = useState('')

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/getcctv'
                );
                setLocationData(responseData)
                setSearchData(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        if (props.open) {
            fetchLocations();
        }
    }, [props.open, sendRequest])

    const clearLocation = () => {
        props.setLocation(null);
        setTitle('Choose a Location')
    }
    
    const searchHandler = (event) => {
        setSearchText(event.target.value);
        let search = event.target.value
        let items = locationData;
        if (search) {
            let filterItems = []
            for (let i=0; i< items.length; i++) {
                if (items[i].formatted_address.toLowerCase().includes(search.toLowerCase()) 
                    || items[i].latitude.toString().includes(search)
                    || items[i].longitude.toString().includes(search)
                ) {
                    filterItems.push(items[i])
                }
            }
            setSearchData(filterItems)
        } else {
            setSearchData(items)
        }
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="max-width-dialog-title"
        >
        <DialogTitle>
            <Grid container>            
                <Grid item md={8} xs={12}>
                    {title}
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        fullWidth
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        label="Search"
                        value={searchText}
                        onChange={searchHandler}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        }}
                    />
                </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent>
            {isLoading && (
                <div className={classes.loader}>
                    <LoadingSpinner />
                </div>
            )}
            <Grid container>
                {searchData && searchData.map((location, index) => 
                    <LocationItem
                        key={index}
                        oid={location._id.$oid}
                        latitude={location.latitude}
                        longitude={location.longitude}
                        name={location.formatted_address}
                        setLocation={props.setLocation}
                        setTitle={setTitle}
                    />
                )}
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={clearLocation} color="primary">
            Clear
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
}

const Upload = () => {
    const classes = useStyles();
    const [videoFile, setVideoFile] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [location, setLocation] = useState();
    const [errorText, setErrorText] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const uploadHandler = () => {
        if (videoFile && selectedDate && location) {
            console.log('maaal')
        } else {
            setErrorText('Fields are empty! Please recheck provided params.')
        }
    }

    return (
        <React.Fragment>
            <LocationDialog open={open} handleClose={handleClose} setLocation={setLocation} />
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
                            <div>
                                <Grid container className={classes.chooseLocation}>
                                    <Grid item xs={6}>
                                        <Paper square className={classes.locationPaper}>
                                            {location ? (
                                                <div style={{ padding: '5px' }}>
                                                    <div style={{ fontSize: '12px' }}>
                                                        Latitude
                                                    </div>
                                                    <div style={{ color: '#fff'}}>
                                                        {location.latitude}
                                                    </div>
                                                    <div style={{ fontSize: '12px' }}>
                                                        Longitude
                                                    </div>
                                                    <div style={{ color: '#fff'}}>
                                                        {location.longitude}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Typography style={{ marginTop: '14%', fontSize: '18px', textAlign: 'center' }}>
                                                    No Location selected
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper square className={classes.locationButton} onClick={handleClickOpen}>
                                            <div style={{ margin: '10px' }}>
                                                <MyLocationIcon fontSize='large' />
                                            </div>
                                            Choose Location
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                            <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                {errorText && (
                                    <Alert variant="outlined" style={{ color: '#f44336', marginBottom: '10px' }} severity="error" onClose={() => {setErrorText('')}}>
                                        {errorText}
                                    </Alert>
                                )}
                            </div>
                            <div style={{ paddingLeft: '20px', paddingRight: '20px', marginBottom: '5px', textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.uploadButton}
                                    startIcon={<CloudUploadIcon />}
                                    onClick={uploadHandler}
                                >
                                    Upload
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </React.Fragment>
    )
}

export default Upload;