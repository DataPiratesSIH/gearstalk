import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useAttribute } from "../context/attribute-context";
import { useHttpClient } from "../hooks/http-hook";
import AttributeList from "./AttributeList";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Grid } from "@material-ui/core";
import SearchTabs from "./SearchTabs";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ChooseDialog from "./ChooseDialog";
import qualityIcon from "./quality.svg";
import ReactPlayer from "react-player";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  option: {
    width: "50%",
    display: "inline-block",
    padding: "10px",
    marginTop: "20px",
    paddingTop: "15px",
    background: "#2a3f73",
    color: "#ffffff",
    border: "1px solid #4f619a",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "15px",
    "&:hover": {
      background: "#30a3f2",
      border: "1px solid #30a3f2",
    },
  },
  playIcon: {
    fontSize: "100px",
  },
  tryButton: {
    margin: theme.spacing(1),
    textTransform: "none",
    fontFamily: "Trebuchet MS, Helvetica, sans-serif",
    borderRadius: 7,
    fontWeight: 600,
    color: "#1E1E30",
    fontSize: "17px",
    background: "#5ce1e6",
    "&:hover": {
      background: "#ffffff",
    },
  },
}));

interface Props {
  video: { [key: string]: any };
  setVideo: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
}

const SearchGrid: React.FC<Props> = ({ video, setVideo }) => {
  let location = useLocation();
  const [{ attributes }, dispatch] = useAttribute();
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [videoTag, setVideoTag] = useState<string>("");
  const handleClose = () => setOpen(false);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    if (location.state) setVideoTag(String(location.state[0]));
  }, [location]);

  useEffect(() => {
    if (videoTag) {
      const fetchVideo = async () => {
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL +
              "/video/getvideobyid/" +
              videoTag,
            "GET",
            null,
            {
              Authorization: "Bearer " + auth.token,
            }
          );
          console.log(responseData);
          setVideo(responseData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchVideo();
      handleClose();
    }
  }, [videoTag, setVideo, auth.token, sendRequest]);

  const searchHandler = async () => {
    if (attributes.length === 0 || Object.keys(video).length === 0)
      return;
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/query/search",
        "POST",
        JSON.stringify({
          attributes: attributes,
          video_id: video._id.$oid
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.root}>
      <ChooseDialog
        open={open}
        setVideoTag={setVideoTag}
        handleClose={handleClose}
        prepared={true}
      />
      <Grid container spacing={4}>
        <Grid item xl={9} lg={9} md={9} xs={12} sm={12}>
          <Paper className={classes.paper} square>
            {Object.keys(video).length > 0 ? (
              <ReactPlayer
                controls
                // style={{ boxShadow: "-3px 6px 34px 6px rgba(18,25,41,1)" }}
                url={`${process.env.REACT_APP_BACKEND_URL}/helpers/video/${video.file_id}`}
                light={`${process.env.REACT_APP_BACKEND_URL}/helpers/file/${video.thumbnail_id}`}
                playing
                pip
                width="100%"
                playIcon={<PlayCircleFilledIcon className={classes.playIcon} />}
                config={{
                  file: {
                    attributes: {
                      crossOrigin: "anonymous",
                    },
                  },
                }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  border: "2px solid #2db1e1",
                  paddingTop: "10vh",
                }}
              >
                <h2>No Video Selected</h2>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item xl={3} lg={3} md={3} xs={12} sm={12}>
          <Paper className={classes.paper} square>
            <Grid container style={{ textAlign: "center" }}>
              <Grid style={{ marginTop: "10px" }} item xs={12}>
                <img
                  style={{ width: "40%", height: "20vh" }}
                  src={qualityIcon}
                  alt="qualityIcon"
                />
              </Grid>

              <Grid item xs={12}>
                <div className={classes.option} onClick={() => setOpen(true)}>
                  CHOOSE VIDEO
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
          <Paper className={classes.paper} square>
            <AttributeList items={attributes} />
            <Grid container>
              <Grid item md={6} xs={12}>
                <Button
                  className={classes.tryButton}
                  startIcon={<PersonAddIcon />}
                  onClick={() =>
                    dispatch({
                      type: "addPerson",
                    })
                  }
                >
                  Add Person
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Button
                  className={classes.tryButton}
                  startIcon={<SearchIcon />}
                  disabled={attributes.length === 0 || Object.keys(video).length === 0}
                  onClick={searchHandler}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} xs={12} sm={12}>
          <SearchTabs />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchGrid;
