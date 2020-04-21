import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { makeStyles } from '@material-ui/core/styles';
import { FlyToInterpolator } from 'react-map-gl';
import TestMap from './TestMap';
import LoadingSpinner from '../utils/LoadingSpinner';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import RoomIcon from '@material-ui/icons/Room';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    margin: {
        margin: theme.spacing(1),
    },
    container: {
        padding: '10px'
    },
    typography: {
        padding: theme.spacing(2),
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
    option: {
        padding: '10px',
        paddingTop: '15px',
        background: '#2a3f73',
        color: '#ffffff',
        border: '1px solid #4f619a', 
        textAlign: 'center',
        cursor: 'pointer',
        "&:hover": {
            background: '#30a3f2',
            border: '1px solid #30a3f2',
        }
    },
    optionTitle: {
        paddingTop: '10px',
        fontSize: '15px',
        fontWeight: '400',
        pointerEvents:'none',
    },
    locationDetails: {
        padding: '10px',
        background: theme.palette.primary.dark,
        border: '1px solid #4f619a', 
    },
    locationAttributes: {
        textAlign: 'left',
        marginTop: '15px',
        marginBottom: '15px',
    },
    locationParams: {
        fontSize: '15px',
        color: '#ffffff',
        fontWeight: '500',
    },
    multilineColor:{
        color:'#ffffff'
    }
}));

const LocationItem = props => {
    const classes = useStyles();

    return (
        <Grid 
            onClick={() => {props.changeCameraHandler(props.oid)}}
            className={classes.locationChooser} 
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

const LocationPopover = props => {
    const classes = useStyles();
    const [searchText, setSearchText] = useState('')
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        if (props.open && props.locationData) {
            setSearchData(props.locationData)
        }
    }, [props.open, props.locationData])

    const [anchorMenu, setAnchorMenu] = React.useState(null);

    const handleClickMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorMenu(null);
    };

    const searchHandler = (event) => {
        setSearchText(event.target.value);
        let search = event.target.value
        let items = props.locationData;
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
        <Popover
            id={props.id}
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Grid container>
                <Grid item md={10} sm={8}>
                    <TextField
                        fullWidth
                        className={classes.margin}
                        style={{ width: '90%' }}
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
                <Grid style={{ textAlign: 'right' }} item md={1} sm={2}>
                    <IconButton aria-label="options" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickMenu}>
                        <SettingsIcon style={{ color: '#fff' }} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorMenu}
                        keepMounted
                        open={Boolean(anchorMenu)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseMenu}>Delete All</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Close</MenuItem>
                    </Menu>
                </Grid>
                <Grid style={{ textAlign: 'right' }} item md={1} sm={2}>
                    <IconButton aria-label="close" onClick={props.handleClose}>
                        <CloseIcon style={{ color: '#fff' }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid style={{ overflowY: 'auto', height: '80vh', minWidth: '60vw' }} container>
                {searchData && searchData.map((location, index) => 
                    <LocationItem
                        key={index}
                        oid={location._id.$oid}
                        latitude={location.latitude}
                        longitude={location.longitude}
                        name={location.formatted_address}
                        changeCameraHandler={props.changeCameraHandler}
                    />
                )}
            </Grid>
        </Popover>
    )
}

const EditPopper = props => {
    const classes = useStyles();
    const [newCamera, setNewCamera] = useState({
        oid: '',
        latitude: '',
        longitude: ''
    })

    useEffect(() => {
        if (props.open && props.camera) {
            setNewCamera({
                oid: props.camera._id.$oid,
                latitude: props.camera.latitude.toString(),
                longitude: props.camera.longitude.toString()
            })
        }
    }, [props.open, props.camera])

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const updateHandler = async () => {
        if (newCamera.oid && newCamera.latitude && newCamera.longitude) {
            console.log(JSON.stringify({
                'oid': newCamera.oid,
                'lat': parseFloat(newCamera.latitude),
                'lon': parseFloat(newCamera.longitude)
            }))
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/updatecctv',
                    'POST',
                    JSON.stringify({
                        'oid': newCamera.oid,
                        'lat': parseFloat(newCamera.latitude),
                        'lon': parseFloat(newCamera.longitude)
                    })
                )
                console.log(responseData)
            } catch(err) {
                console.log(error)
            }
        }
    }

    return (
        <Popper open={props.open} anchorEl={props.anchorEl} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
                <div style={{ padding: '10px' }}>
                    <TextField 
                        InputProps={{className: classes.multilineColor}} 
                        value={newCamera.latitude} 
                        type="number"
                        onChange={event => setNewCamera({
                            ...newCamera,
                            latitude: event.target.value
                        })}
                        label="Latitude" 
                    />
                </div>
                <div style={{ padding: '10px' }}> 
                    <TextField 
                        InputProps={{className: classes.multilineColor}} 
                        value={newCamera.longitude}
                        type="number"
                        onChange={event => setNewCamera({
                            ...newCamera,
                            longitude: event.target.value
                        })} 
                        label="Longitude" 
                    />
                </div>
                <Grid style={{ textAlign: 'center' }} container>
                    <Grid item xs={6}>
                        <Button onClick={updateHandler}>Update</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => {props.setEditOpen((prev) => !prev)}}>Cancel</Button>
                    </Grid>
                </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
    )
}


const Camera = () => {
    const [locationData, setLocationData] = useState([]);
    const [camera, setCamera] = useState();

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [errorText, setErrorText] = useState('')

    const [viewState, setViewState] = useState({
        latitude: 19.0760,
        longitude: 72.8777,
        zoom: 10,
        pitch: 40.5,
        bearing: 0.7,
    })

    const classes = useStyles();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/getcctv'
                );
                setLocationData(responseData)
                if (responseData.length > 1) {
                    setCamera(responseData[0])
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchLocations();

    }, [sendRequest])

    const [editEl, setEditEl] = React.useState(null);
    const [editOpen, setEditOpen] = React.useState(false);

    const handleEdit = (event) => {
        setEditEl(event.currentTarget);
        setEditOpen((prev) => !prev);
    };

    const handleChangeViewState = ({ viewState }) => setViewState(viewState)

    const handleFlyTo = destination => {
        setViewState({ 
            ...viewState, 
            ...destination, 
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const optionHandler = (event) => {
        if (locationData.length === 0 && !camera) {
            setErrorText('No camera found in the database. Start with inserting one.')
        }
        let option = event.target.getAttribute("value")
        switch(option) {
            case "locate":
                console.log("Locate")
                break;
            case "edit":
                console.log("edit")
                handleEdit(event)
                break;
            case "change":
                handleClick(event)
                break;
            case "delete":
                console.log("delete")
                break;
            default:
                setErrorText('Some random error occurred. Please have a bit of patience.')
        }
    }

    const changeCameraHandler = (camera) => {
        let items = locationData
        for (let i=0; i<items.length; i++) {
            if (items[i]._id.$oid === camera) {
                setCamera(items[i])
                break;
            }
        }
        handleClose();
    }

    return (
        <React.Fragment>
            <Grid className={classes.container} container>
                <Grid item md={6} xs={12}>
                    <Grid container>
                        <Grid value="locate" className={classes.option} item xs={3} onClick={optionHandler}>
                            <RoomIcon />
                            <Typography className={classes.optionTitle}>
                                Locate Camera
                            </Typography>
                        </Grid>
                        <Grid value="edit" className={classes.option} item xs={3} onClick={optionHandler}>
                            <EditIcon />
                            <Typography className={classes.optionTitle}>
                                Edit Details
                            </Typography>
                        </Grid>
                        <EditPopper open={editOpen} anchorEl={editEl} camera={camera} setEditOpen={setEditOpen} />
                        <Grid aria-describedby={id} value="change" className={classes.option} item xs={3}  onClick={optionHandler}>
                            <CameraAltIcon />
                            <Typography className={classes.optionTitle}>
                                Change Camera
                            </Typography>
                        </Grid>
                        <LocationPopover 
                            id={id} open={open} 
                            anchorEl={anchorEl} 
                            handleClose={handleClose} 
                            locationData={locationData} 
                            changeCameraHandler={changeCameraHandler}
                        />
                        <Grid value="delete" className={classes.option} item xs={3} onClick={optionHandler}>
                            <DeleteIcon />
                            <Typography className={classes.optionTitle}>
                                Delete
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className={classes.locationDetails} container>
                        {errorText && (
                            <Alert variant="outlined" style={{ color: '#f44336', marginBottom: '10px' }} severity="error" onClose={() => {setErrorText('')}}>
                                {errorText}
                            </Alert>
                        )}
                        {isLoading && (
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ padding: '30px' }}>
                                    <LoadingSpinner />
                                </div>
                            </Grid>
                        )}
                        {!isLoading && (
                            <div style={{ width: '100%' }}>
                                {locationData.length > 1 ? (
                                        <div style={{ padding: '10px', textAlign: 'center'}}>
                                            {camera && (
                                                <Grid container>
                                                    <Grid style={{ padding: '10px' }} item xs={10}>
                                                        <Typography variant='h6' gutterBottom>
                                                            Camera Id #{camera._id.$oid}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid style={{ padding: '10px' }} item xs={2}>
                                                        <InfoOutlinedIcon fontSize='large' />
                                                    </Grid>
                                                        <Grid className={classes.locationAttributes} item xs={6}>
                                                            <div>
                                                                Latitude
                                                            </div>
                                                            <div className={classes.locationParams}>
                                                                {camera.latitude}
                                                            </div>
                                                        </Grid>
                                                        <Grid className={classes.locationAttributes} item xs={6}>
                                                            <div>
                                                                Longitude
                                                            </div>
                                                            <div className={classes.locationParams}>
                                                                {camera.longitude}
                                                            </div>
                                                        </Grid>
                                                        <Grid className={classes.locationAttributes} item xs={6}>
                                                            <div>
                                                                Country
                                                            </div>
                                                            <div className={classes.locationParams}>
                                                                {camera.country}
                                                            </div>
                                                        </Grid>
                                                        <Grid className={classes.locationAttributes} item xs={6}>
                                                            <div>
                                                                State
                                                            </div>
                                                            <div className={classes.locationParams}>
                                                                {camera.state}
                                                            </div>
                                                        </Grid>
                                                        <Grid className={classes.locationAttributes} item xs={6}>
                                                            <div>
                                                                City
                                                            </div>
                                                            <div className={classes.locationParams}>
                                                                {camera.city}
                                                            </div>
                                                        </Grid>
                                                        <Grid className={classes.locationAttributes} item xs={6}>
                                                            <div>
                                                                Sublocality
                                                            </div>
                                                            <div className={classes.locationParams}>
                                                                {camera.sublocality}
                                                            </div>
                                                        </Grid>
                                                </Grid>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ padding: '30px', textAlign: 'center'}}>
                                            No Camera in the database. Please add a camera to load details.
                                        </div>
                                )}
                            </div>
                        )}
                    </Grid>
                </Grid>
                <Grid item md={6} xs={12}>
                    {/* <button 
                        onClick={() => {handleFlyTo({ latitude: 12.9718871, longitude: 77.59367089999999 })}}>
                        GO
                    </button>
                    <button 
                        onClick={() => {handleFlyTo({ latitude: 22.5626151, longitude: 88.3629926 })}}>
                        GO
                    </button>
                    <TestMap 
                        width="100%" 
                        height="80vh" 
                        viewState={viewState}
                        onViewStateChange={handleChangeViewState}
                        libraries={locationData}
                    /> */}
                </Grid>
            </Grid>
        </React.Fragment>

    )
}

export default Camera;