import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import qualityIcon from "./quality.svg";
import ChooseDialog from "./ChooseDialog";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  option: {
    width: "50%",
    display: "inline-block",
    padding: "10px",
    marginTop: "100px",
    paddingTop: "15px",
    background: "#2a3f73",
    color: "#ffffff",
    border: "1px solid #4f619a",
    textAlign: "center",
    cursor: "pointer",
    fontSize: "18px",
    "&:hover": {
      background: "#30a3f2",
      border: "1px solid #30a3f2",
    },
  },
}));

const VideoQuality: React.FC = () => {
  let history = useHistory();

  const [open, setOpen] = useState<boolean>(false);
  const [videoTag, setVideoTag] = useState<string>("");
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  useEffect(() => {
    if (videoTag) history.push(`enhance/${videoTag}`);
  }, [history, videoTag]);

  useEffect(() => {    
    return () => {
      setOpen(false);
    }
  }, [])
  
  return (
    <>
      <ChooseDialog
        open={open}
        setVideoTag={setVideoTag}
        handleClose={handleClose}
        prepared={false}
      />
      <Grid container style={{ textAlign: "center" }}>
        <Grid style={{ marginTop: "100px" }} item xs={12}>
          <img
            style={{ width: "40%", height: "30vh" }}
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
    </>
  );
};

export default VideoQuality;
