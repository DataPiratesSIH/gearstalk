import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import TestMap from './TestMap';
import { FlyToInterpolator } from 'react-map-gl';

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
}));


const Camera = () => {
    const [locationData, setLocationData] = useState([])

    // eslint-disable-next-line
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [viewState, setViewState] = useState({
        latitude: 19.0760,
        longitude: 72.8777,
        zoom: 10,
        pitch: 40.5,
        bearing: 0.7,
    })

    // eslint-disable-next-line
    const classes = useStyles();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/getcctv'
                );
                setLocationData(responseData)
                console.log(responseData)
            } catch (err) {
                console.log(err)
            }
        }
        fetchLocations();

    }, [sendRequest])

    const handleChangeViewState = ({ viewState }) => setViewState(viewState)

    const handleFlyTo = destination => {
        setViewState({ 
            ...viewState, 
            ...destination, 
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator()
        })
    }


    return (
        <React.Fragment>
            <button 
                onClick={() => {handleFlyTo({ latitude: 12.9718871, longitude: 77.59367089999999 })}}>
                GO
            </button>
            <button 
                onClick={() => {handleFlyTo({ latitude: 22.5626151, longitude: 88.3629926 })}}>
                GO
            </button>
            <TestMap 
                width="70vw" 
                height="70vh" 
                viewState={viewState}
                onViewStateChange={handleChangeViewState}
                libraries={locationData}
            />
        </React.Fragment>

    )
}

export default Camera;