import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { GiMiner, GiMiningHelmet } from "react-icons/gi";
import Header from "./Header";
import { PieChart, WorldMap } from "./Charts";
import TechStack from "./Techstack";
import Footer from "./Footer";

import "./Landing.css";

const Landing: React.FC = () => {
  let history = useHistory();

  return (
    <div className="landing">
      <Header />
      <div className="section-content rowC section1">
        <Grid container>
          <Grid
            style={{ paddingLeft: "0px", textAlign: "left", color: "white" }}
            item
            md={6}
            xs={12}
          >
            <br />
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(29, 36, 63, 1) 5%, rgba(35, 46, 79, 1) 96%)",
                borderRadius: "50px",
                padding: "15px",
                color: "white",
                fontSize: "15px",
              }}
            >
              Smart India Hackathon Project
            </button>
            <br />
            <h1 style={{ padding: "10px", fontSize: "50px" }}>
              Textiles Detection
            </h1>
            <h3 style={{ padding: "10px" }}>
              To configure this component to work with your existing app, you’ll
              need to import and call initImages, passing an object for
              configuration. imageResolver is where you will take the processed
              image object with calculated dimensions and generate a URL that
              conforms to how your CMS resizes images.
            </h3>
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/console")}
            >
              Go to Console
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="outlined" color="primary">
              Github
            </Button>
          </Grid>
          <Grid
            className="inner-content"
            style={{ paddingLeft: "0px" }}
            item
            md={6}
            xs={12}
          >
            <img
              src={require("./images/start.png")}
              className="start-img"
              alt="Start_image"
            />
          </Grid>
        </Grid>
      </div>

      <div className="section-content section2" style={{ background: "#111" }}>
        <div className="inner-content">
          <h1 className="Headers">Features Implemented</h1>
          <Grid container>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiner size="90px" color="blue" />
              <h2>feature1</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiningHelmet size="90px" color="blue" />
              <h2>feature2</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiner size="90px" color="blue" />
              <h2>feature3</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiningHelmet size="90px" color="blue" />
              <h2>feature4</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiner size="90px" color="blue" />
              <h2>feature5</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiner size="90px" color="blue" />
              <h2>feature1</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiningHelmet size="90px" color="blue" />
              <h2>feature2</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiner size="90px" color="blue" />
              <h2>feature3</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiningHelmet size="90px" color="blue" />
              <h2>feature4</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
            <Grid className="box" item lg={3} md={4} sm={6} xs={12}>
              <GiMiner size="90px" color="blue" />
              <h2>feature5</h2>
              <h5>
                The leading digital currency by market capitalization, has grown
                in value by more than 10 times.
              </h5>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="section-content section3">
        <h1 className="Headers">About the Model</h1>
        <br />
        <Grid container>
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            style={{ paddingLeft: "20px", textAlign: "left" }}
          >
            <h1 style={{ color: "lightgreen" }}>MultiLabel Image classifier</h1>
            <h4>(Resnet Architechture)</h4>
            <h3>
              To configure this component to work with your existing app, you’ll
              need to import and call initImages, passing an object for
              configuration. imageResolver is where you will take the processed
              image object with calculated dimensions and generate a URL that
              conforms to how your CMS resizes images.<br></br>The example below
              connects to a local instance of image-steam and will resize image
              based on the users viewport and pixel density.
            </h3>
          </Grid>
          <Grid item md={6} sm={12} style={{ paddingLeft: "10px" }}>
            <PieChart />
          </Grid>
        </Grid>
      </div>

      <div className="section-content section4" style={{ background: "#111" }}>
        <h1 className="Headers">Preparation of the Database</h1>
        <Grid container>
          <Grid item md={6} sm={12}>
            <WorldMap />
          </Grid>
          <Grid
            style={{ textAlign: "left", color: "#2563ff" }}
            item
            md={6}
            sm={12}
          >
            <h1 style={{ padding: "0px 15px" }}>
              CCTV Cameras at<br></br>various Locations.
            </h1>
            <h3 style={{ padding: "0px 15px", color: "white" }}>
              To configure this component to work with your existing app, you’ll
              need to import and call initImages, passing an object for
              configuration. imageResolver is where you will take the processed
              image object with calculated dimensions and generate a URL that
              conforms to how your CMS resizes images.<br></br>The example below
              connects to a local instance of image-steam and will resize image
              based on the users viewport and pixel density.
            </h3>
          </Grid>
        </Grid>
      </div>

      <div
        className="section-content section5"
        style={{ padding: "0px", background: "#111" }}
      >
        <div className="inner-content">
          <h1 className="Headers">Technologies Used</h1>
          <TechStack />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
