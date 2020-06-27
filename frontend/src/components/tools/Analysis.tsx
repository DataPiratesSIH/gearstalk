import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/auth-context";
import { useParams } from 'react-router-dom';
import { useHttpClient } from "../hooks/http-hook";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from 'react-player';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: "20px",
    },
    playIcon: {
      fontSize: "100px",
    },
  }));
const Analysis: React.FC = () => {
    const classes = useStyles();
    const { oid } = useParams();
    const auth = useContext(AuthContext);
    const [video, setVideo] = useState<{ [key: string]: any }>({});
    const { sendRequest } = useHttpClient();
    useEffect(() => {
        const fetchVideo = async () => {
          try {
            const responseData = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/video/getvideobyid/" + oid,
              "GET",
              null,
              {
                Authorization: 'Bearer ' + auth.token
              }
            );
            console.log(responseData);
            setVideo(responseData);
          } catch (err) {
            console.log(err);
          }
        };
        console.log(oid);
        fetchVideo();
      }, [oid, sendRequest, auth.token]);
    return (
        <div>
            <ReactPlayer
                  controls
                  style={{ boxShadow: "-3px 6px 34px 6px rgba(18,25,41,1)" }}
                  url={`${process.env.REACT_APP_BACKEND_URL}/helpers/video/${video.file_id}`}
                  light={`${process.env.REACT_APP_BACKEND_URL}/helpers/file/${video.thumbnail_id}`}
                  playing
                  pip
                  width="100%"
                  playIcon={
                    <PlayCircleFilledIcon className={classes.playIcon} />
                  }
                />
        </div>
    )
}

export default Analysis;