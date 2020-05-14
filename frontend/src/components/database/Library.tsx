import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hook';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from '../utils/LoadingSpinner';
import FilterDialog from './FilterDialog';
import MicDialog from '../utils/MicDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import VideoCard from './VideoCard';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import TuneIcon from '@material-ui/icons/Tune';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
    root: {
        height: '80vh', 
        overflow: 'auto', 
        overflowX: 'hidden',
    },
    topContainer: {
        paddingTop: '10px',
        marginBottom: '15px',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: `1px solid ${theme.palette.text.primary}`,
    },
    input: {
        marginLeft: theme.spacing(1),
        textDecoration: 'none',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    iconMargin: {
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    }
}));

const Library: React.FC = () => {
    const classes = useStyles();
    const [search, setSearch] = useState<string>('');

    const [filter, setFilter] = useState<boolean>(false);

    const handleClickFilter = () => {
        if (homeVideos.length > 0) {
            setFilter(true);
        }
    };
  
    const handleClose = () => {
      setFilter(false);
    };

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [videos, setVideos] = useState<{ [key: string]: any }[]>([])
    const [homeVideos, setHomeVideos] = useState([])

    const toggleSearch = (event) => {
        setSearch(event.target.value)
    }

    const homeHandler = () => {
        setVideos(homeVideos)
        setSearch("")
    }

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/video/getvideo','GET');
                setVideos(responseData)
                setHomeVideos(responseData)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchVideos()
    }, [sendRequest])

    const searchHandler = async () => {
        if (search !== "") {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/video/search',
                    'POST',
                    JSON.stringify({
                        search: search
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                clearError()
                setVideos(responseData)
            } catch(err) {
                console.log(err);
            }     
        } 
    }

    const [micOpen, setMicOpen] = useState(false);

    const handleMicOpen = () => {
        setMicOpen(true);
    };
  
    const onText = useCallback((text) => {
        const operation = async (text) => {
            setSearch(text)
            console.log(text)
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/video/search',
                    'POST',
                    JSON.stringify({
                        search: text
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                clearError()
                setVideos(responseData)
            } catch(err) {
                console.log(err);
            }    
        }
        operation(text)
    }, [sendRequest, clearError]);

    const handleMicClose = () => {
        setMicOpen(false);
    };

    const videoDeletor = (oid: string) => {
        setVideos(videos => videos.filter(video => video._id.$oid !== oid))
    }

    return (
        <React.Fragment>
            <MicDialog open={micOpen} onText={onText} handleClose={handleMicClose} />
            <FilterDialog open={filter} handleClose={handleClose} setVideos={setVideos} />
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container className={classes.topContainer}>
                    <Grid item xs={12} md={10} className={classes.search}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'type your query here' }}
                            value={search}
                            onChange={toggleSearch}
                            onKeyPress={(e) => { 
                                if (e.key === 'Enter') {
                                    e.preventDefault(); 
                                    searchHandler();
                                } 
                            }}
                        />
                        <IconButton onClick={searchHandler} color="primary" className={classes.iconButton} aria-label="search">
                            <SearchIcon fontSize='small' />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <IconButton onClick={handleMicOpen} color="primary" className={classes.iconButton} aria-label="mic">
                            <MicIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                    <Grid style={{ textAlign: 'center' }} item md={2} xs={12}>
                        <div className={classes.iconMargin}>
                            <Tooltip title="Filter">
                                <IconButton color="primary" className={classes.iconButton} aria-label="Filter" onClick={handleClickFilter}>
                                    <TuneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Upload Video">
                                <Link to="/upload">
                                    <IconButton color="primary" className={classes.iconButton} aria-label="Upload Video">
                                        <VideoCallIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Back to Home">
                                <IconButton color="primary" className={classes.iconButton} aria-label="Home" onClick={homeHandler}>
                                    <HomeIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    {error && (
                        <div style={{ marginTop: "20p", marginBottom: "20px" }}>
                            <Alert onClose={clearError} severity="error">
                                {error}
                            </Alert>
                        </div>
                    )}                   
                    {isLoading && (
                        <LoadingSpinner />
                    )}
                    {!isLoading && videos.length === 0 && (
                        <div style={{ textAlign: 'center' }}>
                            <Typography style={{ marginTop: '40px' }} variant="h6" gutterBottom>
                                No Video found in the database. Start with uploading one.
                            </Typography>
                        </div>
                    )}
                    {!isLoading && (
                        <Grid container spacing={4}> 
                            {videos.map((video, index) =>
                                <VideoCard 
                                    key={index}
                                    index={index}
                                    oid={video._id.$oid}
                                    name={video.name}
                                    date={video.date}
                                    time={video.date}
                                    location_id={video.location_id}
                                    file_id={video.file_id}
                                    thumbnail_id={video.thumbnail_id}
                                    duration={video.duration}
                                    processed={video.processed}
                                    videoDeletor={videoDeletor}
                                />
                            )}                                     
                        </Grid>
                    )}
                </div>
            </Container>
        </React.Fragment>
    )
}

export default Library;