import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Drawer } from "@material-ui/core";

import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import AirplayIcon from "@material-ui/icons/Airplay";
import { toggledata } from "../utils/utils";
import Line from "../charts/Line";
import Pie from "../charts/Pie";
import Flower from "../charts/Flower";
import Toggle from "../charts/Toggle";
import Tick from "../utils/Tick";
import FrameShower from "./FrameShower";
import LoadingSpinner from "../utils/LoadingSpinner";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "20px",
  },
  topContainer: {
    [theme.breakpoints.up("lg")]: {
      padding: "30px",
    },
  },
  chartContainer: {
    padding: "50px",
  },
  chartDiv: {
    height: "100%",
    background: "#1c233e",
    borderRadius: "20px",
  },
}));
const Analytics: React.FC = () => {
  const classes = useStyles();
  const { oid } = useParams();
  const auth = useContext(AuthContext);
  const [video, setVideo] = useState<{ [key: string]: any }>({});
  const { isLoading, sendRequest } = useHttpClient();
  const [lineData, setLineData] = useState<any[]>([]); // linedata
  const [flowerData, setFlowerData] = useState<any[]>([]); // flowerdata
  const [pieData, setPieData] = useState<any[]>([]);

  // eslint-disable-next-line
  const [toggleData, setToggleData] = useState<any[]>(toggledata);

  const [open, setOpen] = useState<boolean>(false);

  const sidebarHandler = () => setOpen(true);
  const sidebarClose = () => setOpen(false);

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
        setPieData(response.big_data);
        setFlowerData(response.labels_array);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    if (Object.keys(video).length > 0) fetchChartData();
  }, [sendRequest, auth.token, video]);

  return (
    <React.Fragment>
      <Drawer anchor="right" open={open} onClose={sidebarClose}>
        <FrameShower video={video} />
      </Drawer>
      <Grid className={classes.topContainer} container spacing={1}>
        <Grid className={classes.chartContainer} item sm={4} xs={12}>
          <div className={classes.chartDiv}>
            <Tick />
          </div>
        </Grid>
        <Grid className={classes.chartContainer} item sm={4} xs={12}>
          <div className={classes.chartDiv}>
            <div style={{ textAlign: "center", paddingTop: "14%" }}>
              <AccessAlarmIcon color="primary" style={{ fontSize: "70px" }} />
              <p style={{ fontSize: "20px", fontWeight: 500 }}>
                {Object.keys(video).length > 0 && video.duration}
              </p>
            </div>
          </div>
        </Grid>
        <Grid className={classes.chartContainer} item sm={4} xs={12}>
          <div className={classes.chartDiv}>
            <div className={classes.chartDiv}>
              <div style={{ textAlign: "center", paddingTop: "11%" }}>
                <IconButton color="primary" onClick={sidebarHandler}>
                  <AirplayIcon color="primary" style={{ fontSize: "70px" }} />
                </IconButton>

                <p style={{ fontSize: "17px", fontWeight: 500 }}>PLAY FRAMES</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.chartContainer} item xs={12}>
          <div className={classes.chartDiv}>
            {isLoading ? (
              <div style={{ padding: "60px 0px" }}>
                <LoadingSpinner />
              </div>
            ) : (
              <> {lineData.length > 0 && <Line data={lineData} />}</>
            )}
          </div>
        </Grid>
        <Grid className={classes.chartContainer} item sm={6} xs={12}>
          <div className={classes.chartDiv}>
            {isLoading ? (
              <div style={{ padding: "60px 0px" }}>
                <LoadingSpinner />
              </div>
            ) : (
              <> {flowerData.length > 0 && <Flower data={flowerData} />}</>
            )}
          </div>
        </Grid>
        <Grid className={classes.chartContainer} item sm={6} xs={12}>
          <div className={classes.chartDiv}>
            {isLoading ? (
              <div style={{ padding: "60px 0px" }}>
                <LoadingSpinner />
              </div>
            ) : (
              <> {pieData.length > 0 && <Pie data={pieData} />} </>
            )}
          </div>
        </Grid>
        <Grid className={classes.chartContainer} item sm={6} xs={12}>
          <div className={classes.chartDiv}>
            {isLoading ? (
              <div style={{ padding: "60px 0px" }}>
                <LoadingSpinner />
              </div>
            ) : (
              <> {toggleData.length > 0 && <Toggle data={toggleData} />} </>
            )}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Analytics;
