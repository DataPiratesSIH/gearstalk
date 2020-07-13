import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth-context";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Chip, Avatar, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { useInterval } from "../hooks/time-hook";
import { MetaData, Person } from "../../types";
import { md, linedata, piedata, flowerdata, toggledata } from "../utils/utils";
import Dot from "../utils/Dot";
import Line from "../charts/Line";
import Pie from "../charts/Pie";
import Flower from "../charts/Flower";
import Toggle from "../charts/Toggle";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
  },
  playIcon: {
    margin: "200px 0px",
    fontSize: "100px",
    zIndex: 10,
  },
  container: {
    position: "relative",
    width: "100%",
    height: "auto",
    overflow: "hidden",
  },
  canvas: {
    position: "absolute",
    width: "100%",
    height: "500px",
    top: "0px",
    left: "0px",
  },
  personContainer: {
    height: "100%",
    padding: "10px",
  },
  person: {
    border: "1px solid #2db1e1",
    padding: "10px",
  },
  personInfo: {
    padding: "0px 8px",
    fontWeight: 500,
    fontSize: "17px",
  },
}));
const Analytics: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const classes = useStyles();
  const { oid } = useParams();
  const auth = useContext(AuthContext);
  const [video, setVideo] = useState<{ [key: string]: any }>({});
  const { sendRequest } = useHttpClient();
  const playerRef = useRef(null);
  const canvasRef = useRef(null);
  const handleIsPlaying = () => setIsPlaying(true);
  const handleIsNotPlaying = () => setIsPlaying(false);
  const [lineData, setLineData] = useState<any[]>([]); // linedata
  // eslint-disable-next-line
  const [flowerData, setFlowerData] = useState<any[]>([]); // flowerdata
  // eslint-disable-next-line
  const [pieData, setPieData] = useState<any[]>(piedata);
  // eslint-disable-next-line
  const [toggleData, setToggleData] = useState<any[]>(toggledata);

  const [metadata, setMetadata] = useState<MetaData[]>(null);
  const [currentData, setCurrentData] = useState<Person[]>(null);

  const renderPredictions = (persons, canvasRef) => {
    const ctx = canvasRef.current.getContext("2d");
    // ctx.translate(0.5, 0.5);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "10px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    persons.forEach((person) => {
      const x = Math.floor(ctx.canvas.width * person.box[0] + 0.5);
      const y = Math.floor(ctx.canvas.height * person.box[1] + 0.5);
      const width = ctx.canvas.width * person.box[2];
      const height = ctx.canvas.height * person.box[3];
      console.log(x, y, width, height);
      // Draw the bounding box.
      ctx.strokeStyle = "#2db1e1";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      let text: string = "";
      person.labels.forEach((label: string) => (text = text + ", " + label));
      // const textWidth = ctx.measureText(text).width;
      // const textHeight = parseInt(font, 10); // base 10
      // // ctx.fillRect(x, y, textWidth + 1, textHeight + 1)
      // ctx.fillRect(0, 0, textWidth - 1, textHeight - 1);
    });

    // persons.forEach((person) => {
    //   const x = ctx.canvas.width * person.box[0];
    //   const y = ctx.canvas.height * person.box[1];
    //   // Draw the text last to ensure it's on top.
    //   ctx.fillStyle = "#000000";
    //   let text: string = "";
    //   person.labels.forEach((label: string) => (text = text + ", " + label));
    //   ctx.fillText(text, x, y);
    // });
  };

  useEffect(() => {
    if (video) setMetadata(md);
    // if (playerRef.current) console.log(playerRef.current);
  }, [video]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/video/getvideobyid/" + oid,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setVideo(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    // console.log(oid);
    fetchVideo();
  }, [oid, sendRequest, auth.token]);

  // Fetch Chart Data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        console.log(video);
        // eslint-disable-next-line
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/video/visual/" + video._id.$oid, //
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLineData(response.linechart);
        setFlowerData(response.labels_array);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    if (Object.keys(video).length > 0) fetchChartData();
  }, [sendRequest, auth.token, video]);

  useInterval(() => {
    if (metadata && isPlaying && playerRef.current) {
      let ct = playerRef.current.getCurrentTime();
      let f = Math.floor(ct);
      let m = ct % f;
      if (m >= 0.5) ct = ct + 0.5;
      ct = Math.floor(ct * 2);
      try {
        setCurrentData(metadata[ct].persons);
        renderPredictions(metadata[ct].persons, canvasRef);
      } catch (err) {}
    }
  }, 500);

  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={12}>
        <Paper square>{lineData.length > 0 && <Line data={lineData} />}</Paper>
      </Grid>
      <Grid item sm={6} xs={12}>
        <Paper square>
          {flowerData.length > 0 && <Flower data={flowerData} />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {pieData.length > 0 && <Pie data={pieData} />}
      </Grid>

      <Grid style={{ padding: "10px" }} item md={8} sm={12} xs={12}>
        <div className={classes.container}>
          <canvas
            width="100%"
            height="auto"
            className={classes.canvas}
            ref={canvasRef}
          />
          <ReactPlayer
            ref={(player) => {
              playerRef.current = player;
            }}
            onStart={handleIsPlaying}
            onPlay={handleIsPlaying}
            onPause={handleIsNotPlaying}
            onEnded={handleIsNotPlaying}
            controls
            style={{
              boxShadow: "-3px 6px 34px 6px rgba(18,25,41,1)",
            }}
            width="100%"
            height="auto"
            url={`${process.env.REACT_APP_BACKEND_URL}/helpers/video/${video.file_id}`}
            light={`${process.env.REACT_APP_BACKEND_URL}/helpers/file/${video.thumbnail_id}`}
            playing
            pip
            playIcon={<PlayCircleFilledIcon className={classes.playIcon} />}
          />
        </div>
      </Grid>
      <Grid style={{ padding: "10px" }} item md={4} sm={12} xs={12}>
        <Paper className={classes.personContainer} square>
          <Typography
            style={{ marginBottom: "10px", fontSize: "15px", fontWeight: 500 }}
          >
            Metadata will appear over here
          </Typography>
          {currentData &&
            currentData.map((cd, index) => (
              <div key={index} className={classes.person}>
                <div className={classes.personInfo}>Person {index + 1}</div>
                <div>
                  {cd.colors.map((color, index) => (
                    <Dot key={index} color={color} />
                  ))}
                </div>
                <div>
                  {cd.labels.map((label, index) => (
                    <Chip
                      key={index}
                      color="primary"
                      style={{
                        margin: "5px 3px",
                        color: "#1C233E",
                        fontWeight: 600,
                      }}
                      label={label}
                      avatar={<Avatar>{label.charAt(0)}</Avatar>}
                    />
                  ))}
                </div>
              </div>
            ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Analytics;
