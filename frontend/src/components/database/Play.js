import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useHttpClient } from '../hooks/http-hook';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../utils/LoadingSpinner';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

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
    }
}));

const Play = () => {
    const classes = useStyles();
    const params = useParams('/play/:oid');
    const { oid } = params;

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [video, setVideo] = useState()
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

            </Grid>
        </Grid>

    )
}

export default Play;