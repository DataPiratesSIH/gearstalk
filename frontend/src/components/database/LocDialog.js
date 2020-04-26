import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../utils/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
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
    },
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

const LocDialog = props => {
    const classes = useStyles();
    const [locationData, setLocationData] = useState();
    const [searchData, setSearchData] = useState();
    const [searchText, setSearchText] = useState('')
    const [location, setLocation] = useState()

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/cctv/getcctv'
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
        setLocation(null);
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

    const UpdateLocationHandler = async () => {
        if (location && props.video_id) {
            console.log(props.video_id)
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/video/updatevideolocation',
                    'PATCH',
                    JSON.stringify({
                        'video_id': props.video_id,
                        'location_id': location.oid
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                )
                console.log(responseData)
                props.setVideo(responseData)
                props.handleClose()
            } catch (err) {
                console.log(err)
            }
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
            {error && (
                <Alert variant="outlined" style={{ color: '#f44336', marginBottom: '10px' }} severity="error" onClose={clearError}>
                    {error}sdsd
                </Alert>
            )}
            <Grid container>   
                <Grid item md={4} xs={12}>
                    <div>
                        <Typography style={{ color: '#ffffff'}} variant="subtitle2" gutterBottom>Current Location</Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            {props.camera ? `${props.camera.formatted_address}` : 'This video has no Location'}
                        </Typography>
                    </div>
                </Grid>
                <Divider style={{ color: '#ffffff'}} />         
                <Grid item md={4} xs={12}>
                    <div>
                        <Typography style={{ color: '#ffffff'}} variant="subtitle2" gutterBottom>Choose a new Location</Typography>
                        <Typography variant="subtitle2" gutterBottom>{location && `${location.name}`}</Typography>
                    </div>
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
                        setLocation={setLocation}
                    />
                )}
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={UpdateLocationHandler} color="primary" disabled={!location || !props.video_id || isLoading}>
            Update
          </Button>
          <Button autoFocus onClick={clearLocation} color="primary">
            Clear
          </Button>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default LocDialog;