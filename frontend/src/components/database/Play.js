import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useHttpClient } from '../hooks/http-hook';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../utils/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    playIcon: {
        fontSize: '100px',
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
    details: {
        padding: '15px',
    },
    locationAttributes: {
        textAlign: 'left',
        marginTop: '8px',
        marginBottom: '8px',
    },
    locationParams: {
        fontSize: '13px',
        color: '#ffffff',
        fontWeight: '500',
    },
    camDetails: { 
        padding: '10px 20px', 
        textAlign: 'center'
    },
    divider: {
        background: '#323e63',
    },
    camHeading: {
        padding: '15px 15px 5px',
    }
}));

const CamDisplay = ({ location, camera, setCamera}) => {
    const classes = useStyles()
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchCamera = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/cctv/getcctvbyid/' + location, 'GET')
                console.log(responseData)
                setCamera(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        if (location !== null) {
            fetchCamera();
        }
    }, [location, setCamera, sendRequest])

    return (
        <div>
            {isLoading && (
                <LoadingSpinner />
            )}
            {error && (
                <div style={{ marginTop: "20p", marginBottom: "20px" }}>
                    <Alert variant="outlined" style={{ color: '#f44336', marginBottom: '10px' }} severity="error" onClose={clearError}>
                        {error}
                    </Alert>
                </div>
            )}
            {!isLoading && (
                <div>
                    {camera && (
                        <div>
                            <div className={classes.camHeading} item xs={12}>
                                <Typography variant='subtitle1' gutterBottom>
                                    Camera Id <span style={{ color: '#ffffff'}}>#{camera._id.$oid}</span>
                                </Typography>
                            </div>
                            <Divider className={classes.divider} />
                            <Grid className={classes.camDetails} container>
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
                            <Divider className={classes.divider} />                
                            <div className={classes.details}>
                                {camera.formatted_address}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const Play = () => {
    const classes = useStyles();
    const params = useParams('/play/:oid');
    const { oid } = params;

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [video, setVideo] = useState()
    const [camera, setCamera] = useState()

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/video/getvideobyid/' + oid, 'GET')
                console.log(responseData)
                setVideo(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchVideo()
    }, [oid, sendRequest])
    


    return (
        <Grid container className={classes.root}>
            <Grid item md={8} xs={12}>
                <div>
                    {error && (
                        <div style={{ marginTop: "20p", marginBottom: "20px" }}>
                            <Alert onClose={clearError} severity="error">
                                {error}
                            </Alert>
                        </div>
                    )}
                    {isLoading && (
                        <div style={{ marginTop: '25vh' }}>
                            <LoadingSpinner />
                        </div>
                    )}
                    {video && (
                        <ReactPlayer 
                            controls 
                            url={`${process.env.REACT_APP_BACKEND_URL}/helpers/video/${video.file_id}`}
                            light={`${process.env.REACT_APP_BACKEND_URL}/helpers/file/${video.thumbnail_id}`} 
                            playing
                            pip
                            width="100%" 
                            playIcon={<PlayCircleFilledIcon className={classes.playIcon} />}
                        />
                    )}   
                </div>
            </Grid>
            <Grid item md={4} xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper square>
                            {video && (
                                <CamDisplay 
                                    location={video.location_id}
                                    camera={camera}
                                    setCamera={setCamera} 
                                />
                            )}
                        </Paper>
                    </Grid>
                    <Grid value="locate" className={classes.option} item xs={4}>
                        <EditIcon />
                        <Typography className={classes.optionTitle}>
                            Locate Camera
                        </Typography>
                    </Grid>
                    <Grid value="locate" className={classes.option} item xs={4}>
                        <EditIcon />
                        <Typography className={classes.optionTitle}>
                            Locate Camera
                        </Typography>
                    </Grid>
                    <Grid value="locate" className={classes.option} item xs={4}>
                        <EditIcon />
                        <Typography className={classes.optionTitle}>
                            Locate Camera
                        </Typography>
                    </Grid>
                    <Grid value="locate" className={classes.option} item xs={4}>
                        <EditIcon />
                        <Typography className={classes.optionTitle}>
                            Locate Camera
                        </Typography>
                    </Grid>
                    <Grid value="locate" className={classes.option} item xs={4}>
                        <EditIcon />
                        <Typography className={classes.optionTitle}>
                            Locate Camera
                        </Typography>
                    </Grid>
                    <Grid value="locate" className={classes.option} item xs={4}>
                        <EditIcon />
                        <Typography className={classes.optionTitle}>
                            Locate Camera
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default Play;